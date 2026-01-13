from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI(
    title="ICU Prediction API",
    description="AI-powered ICU patient deterioration prediction system",
    version="1.0.0"
)

# Configure CORS - allow both local development and production
# In production, Render will automatically set the PORT environment variable
allowed_origins = [
    "http://localhost:3000",  # Local development
    "http://localhost:3001",  # Alternative local port
    "https://*.vercel.app",   # All Vercel preview deployments
]

# Add production domain from environment variable if set
FRONTEND_URL = os.getenv("FRONTEND_URL")
if FRONTEND_URL:
    allowed_origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if not os.getenv("ALLOW_ALL_ORIGINS") else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Load model at startup
# Check multiple possible locations for the model file
possible_paths = [
    os.path.join(os.path.dirname(__file__), "..", "icu_rf_model.pkl"),  # Parent directory
    os.path.join(os.path.dirname(__file__), "icu_rf_model.pkl"),  # Same directory
    "icu_rf_model.pkl",  # Root directory
]

model = None
for model_path in possible_paths:
    if os.path.exists(model_path):
        try:
            model = joblib.load(model_path)
            print(f"✅ Model loaded successfully from: {model_path}")
            break
        except Exception as e:
            print(f"❌ Failed to load model from {model_path}: {str(e)}")
            continue

if model is None:
    raise FileNotFoundError("❌ Could not find icu_rf_model.pkl in any expected location")

class VitalInput(BaseModel):
    mean_value: float
    max_value: float
    min_value: float
    count: int

class PredictionResponse(BaseModel):
    risk: int
    probability: float
    risk_level: str

@app.get("/")
def root():
    return {"message": "ICU Prediction API", "status": "running"}

@app.post("/predict", response_model=PredictionResponse)
def predict(vitals: VitalInput):
    # Prepare input
    input_df = pd.DataFrame([{
        "mean_value": vitals.mean_value,
        "max_value": vitals.max_value,
        "min_value": vitals.min_value,
        "count": vitals.count
    }])
    
    # Make prediction
    risk = int(model.predict(input_df)[0])
    probability = float(model.predict_proba(input_df)[0][1])
    
    # Determine risk level
    if probability >= 0.7:
        risk_level = "critical"
    elif probability >= 0.4:
        risk_level = "warning"
    else:
        risk_level = "stable"
    
    return PredictionResponse(
        risk=risk,
        probability=probability,
        risk_level=risk_level
    )

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}
