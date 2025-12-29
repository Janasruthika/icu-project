import pandas as pd

# Load features
df = pd.read_csv("icu_vitals_features.csv")

# Initialize label
df["deterioration"] = 0

# Apply clinical rules
df.loc[
    (
        (df["itemid"].isin([211, 220045]) & ((df["max_value"] > 120) | (df["min_value"] < 50))) |
        (df["itemid"].isin([646, 220277]) & (df["min_value"] < 90)) |
        (df["itemid"].isin([618, 224689]) & ((df["max_value"] > 30) | (df["min_value"] < 10))) |
        (df["itemid"].isin([678, 223761]) & ((df["max_value"] > 38.5) | (df["min_value"] < 36)))
    ),
    "deterioration"
] = 1

# Save labeled dataset
df.to_csv("icu_ml_dataset.csv", index=False)

print("✅ Deterioration labels created")
print("📁 File saved as icu_ml_dataset.csv")
