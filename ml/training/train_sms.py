import os
import joblib
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report
)

from ml.preprocessing.sms_preprocessing import clean_text


# ==========================================
# STEP 1 : Load Dataset
# ==========================================

dataset_path = "datasets/sms/SMSSpamCollection"

data = pd.read_csv(
    dataset_path,
    sep="\t",
    header=None,
    names=["label", "message"]
)

print("\nDataset Loaded Successfully!")

# ==========================================
# STEP 2 : Remove Duplicates
# ==========================================

data = data.drop_duplicates()

# Reset index (Fixes previous IndexError)
data = data.reset_index(drop=True)

print("Duplicate Records Removed!")

# ==========================================
# STEP 3 : Clean Text
# ==========================================

print("\nCleaning SMS Messages...")

data["clean_message"] = data["message"].apply(clean_text)

print("Cleaning Completed!")

# ==========================================
# STEP 4 : TF-IDF
# ==========================================

print("\nCreating TF-IDF Features...")

vectorizer = TfidfVectorizer()

X = vectorizer.fit_transform(data["clean_message"])

y = data["label"]

print("TF-IDF Completed!")

# ==========================================
# STEP 5 : Train Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("Dataset Split Completed!")

# ==========================================
# STEP 6 : Train Model
# ==========================================

print("\nTraining Naive Bayes Model...")

model = MultinomialNB()

model.fit(X_train, y_train)

print("Model Training Completed!")

# ==========================================
# STEP 7 : Prediction
# ==========================================

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\n==============================")
print("MODEL PERFORMANCE")
print("==============================")

print(f"\nAccuracy : {accuracy * 100:.2f}%")

print("\n==============================")
print("CONFUSION MATRIX")
print("==============================")

print(confusion_matrix(y_test, predictions))

print("\n==============================")
print("CLASSIFICATION REPORT")
print("==============================")

print(classification_report(y_test, predictions))

# ==========================================
# STEP 8 : Sample Predictions
# ==========================================

print("\n==============================")
print("SAMPLE PREDICTIONS")
print("==============================")

for i in range(10):

    print(f"\nSMS {i+1}")

    print("Original Message:")
    print(data.loc[y_test.index[i], "message"])

    print()

    print("Actual Label    :", y_test.iloc[i])

    print("Predicted Label :", predictions[i])

    print("-" * 80)

# ==========================================
# STEP 9 : Save Model
# ==========================================

save_directory = "ml/saved_models/sms"

os.makedirs(save_directory, exist_ok=True)

joblib.dump(model, os.path.join(save_directory, "sms_model.pkl"))

joblib.dump(vectorizer, os.path.join(save_directory, "tfidf_vectorizer.pkl"))

print("\n==============================")
print("MODEL SAVED SUCCESSFULLY")
print("==============================")

print("\nSaved Files:")

print("✓ sms_model.pkl")

print("✓ tfidf_vectorizer.pkl")