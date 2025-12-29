import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load dataset
df = pd.read_csv("icu_ml_dataset.csv")

# Features and target
X = df[["mean_value", "max_value", "min_value", "count"]]
y = df["deterioration"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

print("✅ Model training completed")
import joblib

joblib.dump(model, "icu_rf_model.pkl")
print("📦 Model saved as icu_rf_model.pkl")
