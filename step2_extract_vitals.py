import pandas as pd

# Load datasets
chartevents = pd.read_csv("data/CHARTEVENTS.csv", low_memory=False)
icustays = pd.read_csv("data/ICUSTAYS.csv")

# Selected ITEMIDs for ICU vitals
ITEMIDS = {
    "HR": [211, 220045],
    "SpO2": [646, 220277],
    "Resp": [618, 224689],
    "Temp": [678, 223761]
}

# Flatten ITEMIDs
all_itemids = sum(ITEMIDS.values(), [])

# Filter vital signs
vitals = chartevents[chartevents["itemid"].isin(all_itemids)]

# Merge with ICU stay info
vitals = vitals.merge(
    icustays,
    on=["subject_id", "hadm_id"],
    how="inner"
)

# 🔍 See what columns actually exist
print("Columns after merge:")
print(vitals.columns)

# Columns we WANT
desired_cols = ["subject_id", "hadm_id", "itemid", "charttime", "valuenum"]

# Keep only columns that exist (SAFE SELECTION)
final_cols = [c for c in desired_cols if c in vitals.columns]
vitals = vitals[final_cols]

# Drop missing values
vitals.dropna(inplace=True)

# Save output
vitals.to_csv("icu_vitals_raw.csv", index=False)

print("✅ ICU vital signs extracted successfully")
print("📁 File saved as icu_vitals_raw.csv")
