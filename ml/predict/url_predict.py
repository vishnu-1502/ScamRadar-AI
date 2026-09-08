import joblib

from ml.utils.trusted_domains import (
    is_trusted,
    looks_like_trusted
)

print("Loading URL Detection Model...")

# Load saved files
model = joblib.load("ml/models/url_model.pkl")
vectorizer = joblib.load("ml/models/url_vectorizer.pkl")
label_encoder = joblib.load("ml/models/url_label_encoder.pkl")

print("Model Loaded Successfully!")

print("\n========================================")
print("ScamRadar AI - URL Detection")
print("========================================")

while True:

    url = input("\nEnter URL:\n").strip()

    # ===========================
    # Trusted Website Check
    # ===========================

    if is_trusted(url):

        print("\n==============================")
        print("Prediction : BENIGN")
        print("Confidence : 100.00%")

        print("\nReason:")
        print("• Trusted Website")
        print("• Official Domain")
        print("• No suspicious activity detected")

        print("==============================")

        choice = input("\nCheck another URL? (y/n): ").lower()

        if choice != "y":
            break

        continue

    # ===========================
    # Fake Trusted Website Check
    # ===========================

    fake_matches = looks_like_trusted(url)

    if len(fake_matches) > 0:

        print("\n==============================")
        print("Prediction : PHISHING")
        print("Confidence : 99.00%")

        print("\nReason:")
        print(f"• Looks similar to trusted website: {fake_matches[0]}")
        print("• Possible Fake Website (Typosquatting)")
        print("• Designed to trick users")

        print("==============================")

        choice = input("\nCheck another URL? (y/n): ").lower()

        if choice != "y":
            break

        continue

    # ===========================
    # Machine Learning Prediction
    # ===========================

    url_vector = vectorizer.transform([url])

    prediction = model.predict(url_vector)[0]

    confidence = model.predict_proba(url_vector).max() * 100

    label = label_encoder.inverse_transform([prediction])[0]

    print("\n==============================")
    print("Prediction :", label.upper())
    print(f"Confidence : {confidence:.2f}%")

    print("\nReason:")

    url_lower = url.lower()

    reasons = []

    suspicious_keywords = [
        "login",
        "verify",
        "update",
        "secure",
        "bank",
        "paypal",
        "account",
        "signin",
        "confirm",
        "password",
        "otp",
        "gift",
        "free",
        "win",
        "reward",
        "bonus",
        "claim"
    ]

    for word in suspicious_keywords:
        if word in url_lower:
            reasons.append(f"• Contains suspicious keyword: {word}")

    if "@" in url:
        reasons.append("• '@' symbol detected")

    if url.count("-") >= 2:
        reasons.append("• Too many hyphens")

    if len(url) > 80:
        reasons.append("• URL is unusually long")

    if url.count(".") > 4:
        reasons.append("• Too many subdomains")

    if url.startswith("http://"):
        reasons.append("• Uses HTTP instead of HTTPS")

    if label == "benign" and len(reasons) == 0:
        reasons.append("• URL structure appears normal")
        reasons.append("• No suspicious keywords found")
        reasons.append("• Looks like a legitimate website")

    if len(reasons) == 0:
        reasons.append("• Detected based on machine learning pattern")

    for reason in reasons:
        print(reason)

    print("==============================")

    choice = input("\nCheck another URL? (y/n): ").lower()

    if choice != "y":
        break

print("\nThank you for using ScamRadar AI!")