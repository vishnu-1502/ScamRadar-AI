import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.linear_model import LogisticRegression

from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    classification_report
)

print("Loading Email Dataset...")

data = pd.read_csv("datasets/email/spam_assassin.csv")

print("Dataset Loaded Successfully!")

print("\nCleaning Dataset...")

data = data.dropna()

print("Cleaning Completed!")

print("\nCreating TF-IDF Features...")

vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=10000
)

X = vectorizer.fit_transform(data["text"])

y = data["target"]

print("TF-IDF Completed!")

print("\nSplitting Dataset...")

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("Dataset Split Completed!")

print("\nTraining Logistic Regression Model...")

model = LogisticRegression(
    max_iter=1000
)

model.fit(X_train, y_train)

print("Model Training Completed!")

print("\nMaking Predictions...")

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\n==============================")
print("MODEL PERFORMANCE")
print("==============================")

print(f"\nAccuracy : {accuracy*100:.2f}%")

print("\n==============================")
print("CONFUSION MATRIX")
print("==============================")

print(confusion_matrix(y_test, predictions))

print("\n==============================")
print("CLASSIFICATION REPORT")
print("==============================")

print(classification_report(y_test, predictions))

print("\n==============================")
print("SAMPLE PREDICTIONS")
print("==============================")

sample_texts = data["text"].head(10)

sample_vectors = vectorizer.transform(sample_texts)

sample_predictions = model.predict(sample_vectors)

for i, prediction in enumerate(sample_predictions):

    label = "SPAM" if prediction == 1 else "HAM"

    print(f"\nEmail {i+1}")
    print("Prediction :", label)
    print("-"*60)

joblib.dump(model, "ml/models/email_nlp_model.pkl")

joblib.dump(vectorizer, "ml/models/email_vectorizer.pkl")

print("\n==============================")
print("MODEL SAVED SUCCESSFULLY")
print("==============================")

print("\nSaved Files:")
print("✓ email_nlp_model.pkl")
print("✓ email_vectorizer.pkl")