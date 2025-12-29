import pandas as pd

# Load extracted vitals
vitals = pd.read_csv("icu_vitals_raw.csv")

# Convert time column
vitals["charttime"] = pd.to_datetime(vitals["charttime"])

# Group by patient + admission + vital
features = vitals.groupby(
    ["subject_id", "hadm_id", "itemid"]
).agg(
    mean_value=("valuenum", "mean"),
    max_value=("valuenum", "max"),
    min_value=("valuenum", "min"),
    count=("valuenum", "count")
).reset_index()

# Save ML-ready features
features.to_csv("icu_vitals_features.csv", index=False)

print("✅ Feature engineering completed")
print("📁 File saved as icu_vitals_features.csv")
