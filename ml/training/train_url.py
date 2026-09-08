
import os
import sys
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report
)
from sklearn.preprocessing import LabelEncoder


# ==========================================
# PROJECT ROOT
# ==========================================

PROJECT_ROOT = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../.."
    )
)

if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)


from ml.preprocessing.url_preprocessing import (
    extract_url_features
)


# ==========================================
# PATHS
# ==========================================

DATASET_PATH = os.path.join(
    PROJECT_ROOT,
    "datasets",
    "url",
    "malicious_phish.csv"
)

MODEL_PATH = os.path.join(
    PROJECT_ROOT,
    "ml",
    "models",
    "url_model.pkl"
)

LABEL_ENCODER_PATH = os.path.join(
    PROJECT_ROOT,
    "ml",
    "models",
    "url_label_encoder.pkl"
)

FEATURE_NAMES_PATH = os.path.join(
    PROJECT_ROOT,
    "ml",
    "models",
    "url_feature_names.pkl"
)


# ==========================================
# LOAD DATASET
# ==========================================

print("Loading Dataset...")

data = pd.read_csv(
    DATASET_PATH
)

print("Dataset Loaded Successfully!")

print("\nDataset Shape:")
print(data.shape)

print("\nDataset Labels:")
print(data["type"].value_counts())


# ==========================================
# REMOVE DUPLICATES
# ==========================================

data = data.drop_duplicates(
    subset="url"
).reset_index(drop=True)

print("\nDuplicate URLs Removed!")

print("New Dataset Shape:")
print(data.shape)


# ==========================================
# FEATURE EXTRACTION
# ==========================================

print("\nExtracting URL Features...")

feature_list = []

for url in data["url"]:

    feature_list.append(
        extract_url_features(url)
    )

features = pd.DataFrame(
    feature_list
)

print("Feature Extraction Completed!")

print("\nFeatures Used:")

for feature in features.columns:

    print(" -", feature)


# ==========================================
# LABEL ENCODING
# ==========================================

label_encoder = LabelEncoder()

labels = label_encoder.fit_transform(
    data["type"]
)

print("\n==============================")
print("LABEL ENCODER MAPPING")
print("==============================")

for i, label in enumerate(
    label_encoder.classes_
):

    print(
        f"{i} -> {label}"
    )


# ==========================================
# TRAIN TEST SPLIT
# ==========================================

print("\nSplitting Dataset...")

X_train, X_test, y_train, y_test = train_test_split(

    features,

    labels,

    test_size=0.20,

    random_state=42,

    stratify=labels

)

print("Dataset Split Completed!")

print(
    "\nTraining Samples:",
    len(X_train)
)

print(
    "Testing Samples :",
    len(X_test)
)


# ==========================================
# TRAIN RANDOM FOREST
# ==========================================

print(
    "\nTraining Random Forest Model..."
)

model = RandomForestClassifier(

    n_estimators=200,

    random_state=42,

    n_jobs=-1,

    class_weight="balanced"

)

model.fit(
    X_train,
    y_train
)

print(
    "Model Training Completed!"
)


# ==========================================
# PREDICTIONS
# ==========================================

print("\nMaking Predictions...")

predictions = model.predict(
    X_test
)


# ==========================================
# MODEL PERFORMANCE
# ==========================================

accuracy = accuracy_score(
    y_test,
    predictions
)

print("\n==============================")
print("MODEL PERFORMANCE")
print("==============================")

print(
    f"\nAccuracy : {accuracy * 100:.2f}%"
)


# ==========================================
# CONFUSION MATRIX
# ==========================================

print("\n==============================")
print("CONFUSION MATRIX")
print("==============================")

print(
    confusion_matrix(
        y_test,
        predictions
    )
)


# ==========================================
# CLASSIFICATION REPORT
# ==========================================

print("\n==============================")
print("CLASSIFICATION REPORT")
print("==============================")

print(
    classification_report(
        y_test,
        predictions,
        target_names=label_encoder.classes_
    )
)


# ==========================================
# SAMPLE PREDICTIONS
# ==========================================

print("\n==============================")
print("SAMPLE PREDICTIONS")
print("==============================")

decoded_predictions = (
    label_encoder.inverse_transform(
        predictions
    )
)

decoded_actual = (
    label_encoder.inverse_transform(
        y_test
    )
)

sample_urls = data.loc[
    X_test.index,
    "url"
].reset_index(drop=True)

for i in range(
    min(10, len(sample_urls))
):

    print(f"\nURL {i + 1}")

    print("Original URL:")
    print(sample_urls[i])

    print(
        "Actual Type    :",
        decoded_actual[i]
    )

    print(
        "Predicted Type :",
        decoded_predictions[i]
    )

    print("-" * 80)


# ==========================================
# SAVE MODEL
# ==========================================

print("\nSaving Model Files...")

joblib.dump(
    model,
    MODEL_PATH
)

joblib.dump(
    label_encoder,
    LABEL_ENCODER_PATH
)

joblib.dump(
    list(features.columns),
    FEATURE_NAMES_PATH
)


# ==========================================
# MODEL SAVED
# ==========================================

print("\n==============================")
print("MODEL SAVED SUCCESSFULLY")
print("==============================")

print("\nSaved Files:")

print("✓ url_model.pkl")

print("✓ url_label_encoder.pkl")

print("✓ url_feature_names.pkl")

print("\nURL ML Engine is ready!")

