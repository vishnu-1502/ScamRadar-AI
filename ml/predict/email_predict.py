import joblib

print("Loading Email Detection Model...")

model = joblib.load("ml/models/email_nlp_model.pkl")
vectorizer = joblib.load("ml/models/email_vectorizer.pkl")

print("Model Loaded Successfully!")

print("\n========================================")
print("ScamRadar AI - Email Detection")
print("========================================")

while True:

    email = input("\nPaste Email Content:\n")

    email_vector = vectorizer.transform([email])

    prediction = model.predict(email_vector)[0]

    confidence = model.predict_proba(email_vector).max() * 100

    print("\n==============================")

    if prediction == 1:
        print("Prediction : SPAM")
    else:
        print("Prediction : HAM")

    print(f"Confidence : {confidence:.2f}%")

    print("\nReason:")

    email_lower = email.lower()

    reasons = []

    suspicious_words = [
        "bank",
        "password",
        "verify",
        "click",
        "urgent",
        "winner",
        "free",
        "gift",
        "account",
        "paypal",
        "login",
        "otp",
        "reward",
        "limited",
        "offer",
        "claim",
        "bitcoin",
        "crypto"
    ]

    for word in suspicious_words:
        if word in email_lower:
            reasons.append(f"• Suspicious keyword detected: {word}")

    if "http://" in email_lower:
        reasons.append("• Contains HTTP link")

    if "https://" in email_lower:
        reasons.append("• Contains URL")

    if "$" in email:
        reasons.append("• Mentions money")

    if prediction == 1 and len(reasons) == 0:
        reasons.append("• Classified as spam using NLP model")

    if prediction == 0:
        reasons.clear()
        reasons.append("• Looks like a normal email")
        reasons.append("• No suspicious content detected")

    for r in reasons:
        print(r)

    print("==============================")

    choice = input("\nCheck another Email? (y/n): ").lower()

    if choice != "y":
        break

print("\nThank you for using ScamRadar AI!")