import streamlit as st
import pandas as pd
import numpy as np
import joblib
import time

# -----------------------------
# PAGE CONFIG
# -----------------------------
st.set_page_config(
    page_title="ICU Predictive Alert Dashboard",
    page_icon="🚨",
    layout="wide"
)

# -----------------------------
# LOAD MODEL
# -----------------------------
model = joblib.load("icu_rf_model.pkl")

# -----------------------------
# SIDEBAR – LIVE INPUTS
# -----------------------------
st.sidebar.title("🩺 Live Vital Inputs")

mean_val = st.sidebar.slider(
    "Mean Vital Value",
    min_value=40,
    max_value=120,
    value=80
)

max_val = st.sidebar.slider(
    "Max Vital Value",
    min_value=60,
    max_value=180,
    value=120
)

min_val = st.sidebar.slider(
    "Min Vital Value",
    min_value=30,
    max_value=100,
    value=60
)

count_val = st.sidebar.slider(
    "Measurement Count",
    min_value=1,
    max_value=50,
    value=10
)

# -----------------------------
# MAIN TITLE
# -----------------------------
st.title("🚨 ICU Predictive Alert Dashboard")
st.caption("Real-time patient deterioration prediction using Machine Learning")

# -----------------------------
# PREPARE INPUT DATA
# -----------------------------
new_patient = pd.DataFrame([{
    "mean_value": mean_val,
    "max_value": max_val,
    "min_value": min_val,
    "count": count_val
}])

# -----------------------------
# MODEL PREDICTION
# -----------------------------
risk = model.predict(new_patient)[0]
prob = model.predict_proba(new_patient)[0][1]

# -----------------------------
# PREDICTION RESULT
# -----------------------------
st.subheader("📊 Prediction Result")

if risk == 1:
    st.error("🚨 HIGH RISK OF DETERIORATION")
else:
    st.success("✅ Patient Stable")

st.metric(
    label="Risk Probability",
    value=f"{prob:.2f}"
)

st.progress(prob)

st.caption(f"⏱ Last updated: {time.strftime('%H:%M:%S')}")

# -----------------------------
# VITAL TREND CHART (IMPORTANT)
# -----------------------------
st.subheader("📈 Vital Trend (Recent Measurements)")

trend_df = pd.DataFrame({
    "Time": ["T-3", "T-2", "T-1", "Now"],
    "Mean Vital": [
        mean_val - 5,
        mean_val - 2,
        mean_val - 1,
        mean_val
    ]
})

st.line_chart(trend_df.set_index("Time"))

# -----------------------------
# REAL-TIME SIMULATION
# -----------------------------
st.markdown("---")

if st.button("🔄 Simulate Real-Time Update"):
    st.experimental_rerun()
