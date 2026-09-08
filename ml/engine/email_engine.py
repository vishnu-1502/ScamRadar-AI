import joblib

print("Loading Email Engine...")

# ==========================
# Load Model
# ==========================

model = joblib.load("ml/models/email_nlp_model.pkl")
vectorizer = joblib.load("ml/models/email_vectorizer.pkl")

print("Email Engine Ready!")


# ==========================
# Main Function
# ==========================

def scan_email(email_text):

    email_text = email_text.strip()

    email_vector = vectorizer.transform([email_text])

    prediction = model.predict(email_vector)[0]

    confidence = model.predict_proba(email_vector).max() * 100

    prediction = "SPAM" if prediction == 1 else "HAM"

    email_lower = email_text.lower()

    reasons = []

    phishing_keywords = [

        "verify",
        "verification",
        "login",
        "signin",
        "sign in",
        "password",
        "reset password",
        "otp",
        "account",
        "bank",
        "payment",
        "credit card",
        "debit card",
        "wallet",
        "upi",
        "refund",
        "invoice",
        "billing",
        "transaction",
        "confirm",
        "update",
        "security",
        "security alert",
        "alert",
        "urgent",
        "immediately",
        "click",
        "link",
        "suspended",
        "limited",
        "winner",
        "won",
        "reward",
        "gift",
        "bonus",
        "claim",
        "lottery",
        "free",
        "bitcoin",
        "crypto",
        "cryptocurrency",
        "paypal",
        "amazon",
        "netflix",
        "microsoft",
        "google",
        "apple"

    ]

    keyword_count = 0

    for word in phishing_keywords:

        if word in email_lower:

            keyword_count += 1

            reasons.append(f"Suspicious keyword detected: {word}")

    if "http://" in email_lower or "https://" in email_lower:

        reasons.append("Contains URL")

        keyword_count += 1

    if "@" in email_text:

        reasons.append("Contains Email Address")

    # ==========================
    # Hybrid Decision Logic
    # ==========================

    # Strong phishing indicators
    if keyword_count >= 3:

        prediction = "SPAM"

    # Very low confidence + no phishing indicators
    elif confidence < 60 and keyword_count == 0:

        prediction = "HAM"

    # ==========================
    # Final Reasons
    # ==========================

    if prediction == "HAM":

        if keyword_count == 0:

            reasons = [
                "Looks like a normal email",
                "No phishing keywords detected",
                "Low spam confidence",
                "Email appears legitimate"
            ]

    else:

        if len(reasons) == 0:

            reasons.append("Detected by Machine Learning")

    return {

        "prediction": prediction,

        "confidence": round(confidence, 2),

        "reasons": reasons

    }