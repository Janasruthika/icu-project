import pandas as pd

# Load D_ITEMS
items = pd.read_csv("data/D_ITEMS.csv")

# Keywords for ICU vital signs
keywords = [
    "Heart Rate",
    "Oxygen Saturation",
    "Respiratory Rate",
    "Temperature",
    "Blood Pressure"
]

# Find matching ITEMIDs using correct column name
vital_items = items[items["label"].str.contains(
    "|".join(keywords), case=False, na=False
)]

# Print ITEMIDs and labels
print(vital_items[["itemid", "label"]])
