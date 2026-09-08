import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

print("Loading Dataset...")

dataset_path = "datasets/url/malicious_phish.csv"

data = pd.read_csv(dataset_path)

print("Dataset Loaded Successfully!")

# Remove duplicates
data.drop_duplicates(subset="url", inplace=True)
# Use first 200000 URLs for faster training
data = data.sample(n=200000, random_state=42)
data.reset_index(drop=True, inplace=True)

print("Duplicate URLs Removed!")

print("\nCleaning URLs...")

data["url"] = data["url"].str.lower().str.strip()

print("Cleaning Completed!")

print("\nCreating TF-IDF Features...")

vectorizer = TfidfVectorizer(
    analyzer="char",
    ngram_range=(3,5),
    max_features=15000
)

X = vectorizer.fit_transform(data["url"])

print("TF-IDF Completed!")

label_encoder = LabelEncoder()

y = label_encoder.fit_transform(data["type"])
print("\nSplitting Dataset...")

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Dataset Split Completed!")

print("\nTraining Logistic Regression Model...")

model = LogisticRegression(
    max_iter=1000,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Model Training Completed!")

print("\nMaking Predictions...")

y_pred = model.predict(X_test)

print("\n==============================")
print("MODEL PERFORMANCE")
print("==============================")

accuracy = accuracy_score(y_test, y_pred)

print(f"\nAccuracy : {accuracy*100:.2f}%")

print("\n==============================")
print("CONFUSION MATRIX")
print("==============================")

print(confusion_matrix(y_test, y_pred))

print("\n==============================")
print("CLASSIFICATION REPORT")
print("==============================")

print(classification_report(
    y_test,
    y_pred,
    target_names=label_encoder.classes_
))

print("\n==============================")
print("SAMPLE PREDICTIONS")
print("==============================")

test_urls = data.iloc[X_test.indices[:10]]["url"].values

actual = label_encoder.inverse_transform(y_test[:10])
predicted = label_encoder.inverse_transform(y_pred[:10])

for i in range(10):

    print(f"\nURL {i+1}")

    print("Original URL:")
    print(test_urls[i])

    print()

    print("Actual Type    :", actual[i])

    print("Predicted Type :", predicted[i])

    print("-"*80)

print("\n==============================")
print("MODEL SAVED SUCCESSFULLY")
print("==============================")

joblib.dump(model, "ml/models/url_model.pkl")
joblib.dump(vectorizer, "ml/models/url_vectorizer.pkl")
joblib.dump(label_encoder, "ml/models/url_label_encoder.pkl")

print("\nSaved Files:")
print("✓ url_model.pkl")
print("✓ url_vectorizer.pkl")
print("✓ url_label_encoder.pkl")