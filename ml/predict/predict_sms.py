import joblib

from ml.preprocessing.sms_preprocessing import clean_text

# ==========================================
# LOAD SAVED MODEL
# ==========================================

print("\nLoading Saved Model...")

model = joblib.load("ml/saved_models/sms/sms_model.pkl")

vectorizer = joblib.load("ml/saved_models/sms/tfidf_vectorizer.pkl")

print("Model Loaded Successfully!")

# ==========================================
# TAKE USER INPUT
# ==========================================

print("\n====================================")
print("ScamRadar AI - SMS Spam Detection")
print("====================================")

while True:

    sms = input("\nEnter SMS Message:\n")

    if sms.strip() == "":
        print("Please enter a valid message.")
        continue

    # --------------------------------------

    cleaned_sms = clean_text(sms)

    sms_vector = vectorizer.transform([cleaned_sms])

    prediction = model.predict(sms_vector)[0]

    probability = model.predict_proba(sms_vector).max() * 100

    print("\n==============================")

    if prediction == "spam":
        print("Prediction : 🚨 SPAM")

    else:
        print("Prediction : ✅ HAM")

    print(f"Confidence : {probability:.2f}%")

    print("==============================")

    choice = input("\nCheck another SMS? (y/n): ")

    if choice.lower() != "y":
        break

print("\nThank you for using ScamRadar AI!")