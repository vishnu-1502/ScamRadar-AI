import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report
)

print("Loading Email Dataset...")

# Load Dataset
data = pd.read_csv("datasets/email/emails.csv")

print("Dataset Loaded Successfully!")

# ==========================
# Features and Labels
# ==========================

X = data.drop(columns=["Email No.", "Prediction"])

y = data["Prediction"]

print("\nFeature Shape :", X.shape)
print("Labels :", len(y))

# ==========================
# Train Test Split
# ==========================

print("\nSplitting Dataset...")

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("Dataset Split Completed!")

print("\nTraining Samples :", len(X_train))
print("Testing Samples  :", len(X_test))

# ==========================
# Train Model
# ==========================

print("\nTraining Random Forest Model...")

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Model Training Completed!")

# ==========================
# Prediction
# ==========================

print("\nMaking Predictions...")

predictions = model.predict(X_test)

# ==========================
# Accuracy
# ==========================

accuracy = accuracy_score(y_test, predictions)

print("\n==============================")
print("MODEL PERFORMANCE")
print("==============================")

print(f"\nAccuracy : {accuracy*100:.2f}%")

# ==========================
# Confusion Matrix
# ==========================

print("\n==============================")
print("CONFUSION MATRIX")
print("==============================")

print(confusion_matrix(y_test, predictions))

# ==========================
# Classification Report
# ==========================

print("\n==============================")
print("CLASSIFICATION REPORT")
print("==============================")

print(classification_report(y_test, predictions))

# ==========================
# Sample Predictions
# ==========================

print("\n==============================")
print("SAMPLE PREDICTIONS")
print("==============================")

sample = X_test.head(10)

sample_predictions = model.predict(sample)

for i in range(len(sample_predictions)):

    print(f"\nEmail {i+1}")

    actual = "SPAM" if y_test.iloc[i] == 1 else "HAM"

    predicted = "SPAM" if sample_predictions[i] == 1 else "HAM"

    print("Actual    :", actual)
    print("Predicted :", predicted)

    print("-"*60)

# ==========================
# Save Model
# ==========================

joblib.dump(model, "ml/models/email/email_model.pkl")

print("\n==============================")
print("MODEL SAVED SUCCESSFULLY")
print("==============================")

print("\nSaved File:")
print("✓ email_model.pkl")