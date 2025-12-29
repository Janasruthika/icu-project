import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier

# Load dataset
df = pd.read_csv("icu_ml_dataset.csv")

# Train model again (simple deployment simulation)
X = df[["mean_value", "max_value", "min_value", "count"]]
y = df["deterioration"]

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Simulate new ICU patient data
new_patient = pd.DataFrame([{
    "mean_value": 130,
    "max_value": 145,
    "min_value": 85,
    "count": 10
}])

# Predict risk
risk = model.predict(new_patient)[0]
prob = model.predict_proba(new_patient)[0][1]

if risk == 1:
    print(f"🚨 ICU ALERT: High risk of deterioration (Probability: {prob:.2f})")
else:
    print(f"✅ Patient stable (Risk Probability: {prob:.2f})")
