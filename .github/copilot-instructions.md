# ICU Patient Deterioration Prediction System

## Architecture Overview

This is a **6-step sequential ML pipeline** that processes MIMIC-III ICU data to build a real-time patient deterioration predictor. Each step produces CSV artifacts consumed by the next step:

```
step1 → step2 → step3 → step4 → step5 → dashboard
```

**Critical**: Steps must be run in order. Each step expects specific input CSVs and produces output CSVs for the next step.

## Pipeline Stages

### Step 1: Find Vital IDs (`step1_find_vital_ids.py`)
- **Input**: `data/D_ITEMS.csv`
- **Output**: Console output (manual identification)
- **Purpose**: Searches for ITEMIDs matching vital sign keywords (Heart Rate, SpO2, Resp, Temp, BP)
- Uses string matching on the `label` column with keywords

### Step 2: Extract Vitals (`step2_extract_vitals.py`)
- **Input**: `data/CHARTEVENTS.csv`, `data/ICUSTAYS.csv`
- **Output**: `icu_vitals_raw.csv`
- **Purpose**: Filters chartevents by hardcoded ITEMIDs and merges with ICU stay metadata
- **Key Pattern**: Uses defensive column selection to avoid merge conflicts
  ```python
  final_cols = [c for c in desired_cols if c in vitals.columns]
  ```

### Step 3: Feature Engineering (`step3_feature_engineering.py`)
- **Input**: `icu_vitals_raw.csv`
- **Output**: `icu_vitals_features.csv`
- **Purpose**: Aggregates vitals per (patient + admission + itemid)
- **Features Created**: `mean_value`, `max_value`, `min_value`, `count`

### Step 4: Create Labels (`step4_create_labels.py`)
- **Input**: `icu_vitals_features.csv`
- **Output**: `icu_ml_dataset.csv`
- **Purpose**: Applies **clinical rules** to generate `deterioration` labels (0/1)
- **Rule Examples**:
  - HR: max>120 or min<50 → deterioration
  - SpO2: min<90 → deterioration
  - Temp: max>38.5 or min<36 → deterioration

### Step 5: Train Model (`step5_train_model.py`)
- **Input**: `icu_ml_dataset.csv`
- **Output**: `icu_rf_model.pkl`
- **Model**: `RandomForestClassifier(n_estimators=100, random_state=42)`
- **Features Used**: Only `["mean_value", "max_value", "min_value", "count"]` (itemid NOT included as feature)
- Prints `classification_report` for evaluation

### Step 6: Alert System (`step6_alert_system.py`)
- **Purpose**: Demonstration of model inference with simulated patient data
- Shows alert logic: risk==1 triggers 🚨 alert

## Dashboard (`dashboard.py`)

**Streamlit web app** for real-time predictions:
- **Loads**: `icu_rf_model.pkl`
- **Input**: Live sliders for mean/max/min/count values (sidebar)
- **Output**: Risk classification + probability + trend chart
- **Run**: `streamlit run dashboard.py`

**UI Components**:
- Risk display: `st.error()` for high risk, `st.success()` for stable
- `st.progress(prob)` for visual risk indicator
- Simulated trend chart using synthetic time series

## Data Structure

### Raw MIMIC-III Data (in `data/`)
- `CHARTEVENTS.csv`: Vital sign measurements (large file, ~millions of rows)
- `D_ITEMS.csv`: Data dictionary mapping itemid to labels
- `ICUSTAYS.csv`: ICU admission metadata
- `PATIENTS.csv`: Patient demographics (not actively used)

### Generated Artifacts (workspace root)
All pipeline outputs are CSVs saved at the root level:
- `icu_vitals_raw.csv` (step 2)
- `icu_vitals_features.csv` (step 3)
- `icu_ml_dataset.csv` (step 4)
- `icu_rf_model.pkl` (step 5)

## Tech Stack & Dependencies

```
streamlit         # Dashboard framework
pandas            # Data manipulation
numpy             # Numerical operations
scikit-learn      # ML (RandomForest)
joblib            # Model serialization
matplotlib        # Plotting (not actively used)
```

Install: `pip install -r requirements.txt`

## Development Workflow

### Initial Setup
1. Ensure MIMIC-III CSV files are in `data/` (CHARTEVENTS.csv, D_ITEMS.csv, ICUSTAYS.csv)
2. Install dependencies: `pip install -r requirements.txt`
3. Run pipeline steps 1-5 sequentially to generate artifacts
4. Verify `icu_rf_model.pkl` exists before launching dashboard

### Quick Start After Setup
If artifacts already exist (icu_vitals_raw.csv, icu_ml_dataset.csv, icu_rf_model.pkl):
```bash
streamlit run dashboard.py  # Launch immediately
```

### Full Pipeline Execution
Run all steps in sequence when starting fresh or after data changes:
```bash
python step1_find_vital_ids.py      # Manual: identifies ITEMIDs
python step2_extract_vitals.py      # Generates icu_vitals_raw.csv
python step3_feature_engineering.py # Generates icu_vitals_features.csv
python step4_create_labels.py       # Generates icu_ml_dataset.csv
python step5_train_model.py         # Generates icu_rf_model.pkl
python step6_alert_system.py        # Optional: CLI test
streamlit run dashboard.py          # Launch web interface
```

### Making Changes
- **Modifying features**: Edit step 3, then rerun steps 3→4→5
- **Changing labels**: Edit step 4 clinical rules, then rerun steps 4→5
- **Model tuning**: Edit step 5 hyperparameters, rerun step 5 only
- **Dashboard UI**: Edit `dashboard.py` and save (Streamlit auto-reloads in dev mode)

## Project-Specific Conventions

### Hardcoded ITEMID Mappings
The project uses specific MIMIC-III ITEMIDs (defined in [step2_extract_vitals.py](step2_extract_vitals.py)):
```python
ITEMIDS = {
    "HR": [211, 220045],
    "SpO2": [646, 220277],
    "Resp": [618, 224689],
    "Temp": [678, 223761]
}
```
These are consistent across steps 2 and 4. **Do not modify** without updating both files.

### Clinical Rule-Based Labeling
This project uses **supervised learning with rule-based labels** (step 4), not actual patient outcome data. The "deterioration" target is synthetic, derived from vital sign thresholds, not ground-truth ICU outcomes.

### Model Input Features
The trained model expects exactly 4 features in this order:
1. `mean_value`
2. `max_value`
3. `min_value`
4. `count`

**Do not** pass `itemid`, `subject_id`, or `hadm_id` to the model.

### Dashboard State Management
The dashboard uses `st.experimental_rerun()` for simulated real-time updates. This is a placeholder pattern - in production, this would connect to a live data stream.

## Common Tasks

### Adding a New Vital Sign
1. Find ITEMID in step 1 output
2. Add to `ITEMIDS` dict in step 2
3. Add clinical rule to step 4
4. Rerun steps 2→5

### Debugging Data Issues
- Check `low_memory=False` in pandas.read_csv for large files (step 2)
- Use `.columns` inspection pattern when merge conflicts occur (step 2)
- Verify `dropna()` isn't removing too much data after merges

### Improving Model Performance
- Modify `RandomForestClassifier` hyperparameters in step 5
- Add time-based features in step 3 (e.g., trend slopes)
- Revise clinical rules in step 4 to improve label quality

## Troubleshooting

### Dashboard Won't Start
**Error**: `streamlit run dashboard.py` fails
- **Check**: Does `icu_rf_model.pkl` exist? Run step 5 first
- **Check**: Are all dependencies installed? Run `pip install -r requirements.txt`
- **Fix**: If model is missing, run full pipeline (steps 2-5)

### Empty Output Files
**Error**: Generated CSVs have 0 rows after merge operations
- **Check**: MIMIC-III data files in `data/` are not empty
- **Debug**: Add `print(len(df))` after merge operations in step 2
- **Cause**: ITEMID mismatch or different MIMIC version - verify ITEMIDs in step 1

### Large File Memory Issues
**Error**: `MemoryError` when loading CHARTEVENTS.csv
- **Fix**: `low_memory=False` already used in step 2
- **Alternative**: Filter CHARTEVENTS by date range before loading
- **Note**: CHARTEVENTS can be 1-5GB depending on MIMIC-III extract

### Model Performance Issues
**Symptom**: Classification report shows all zeros or low accuracy
- **Check**: Class imbalance - count deterioration=1 vs deterioration=0 in icu_ml_dataset.csv
- **Fix**: Adjust clinical rules in step 4 to balance classes
- **Note**: Current rules are conservative (high specificity, lower sensitivity)

## Critical Constraints

- **Pipeline Order**: Steps MUST run sequentially - each depends on previous outputs
- **Feature Contract**: Model expects exactly 4 features in exact order (mean, max, min, count)
- **ITEMID Sync**: ITEMIDs in step 2 and step 4 must match - changing one requires changing both
- **No Git Tracking**: CSV artifacts (icu_*.csv) and model files (.pkl) should be gitignored (not committed)
