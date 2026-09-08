
import joblib

print("Loading SMS Engine...")

# Load Model
model = joblib.load("ml/saved_models/sms/sms_model.pkl")
vectorizer = joblib.load("ml/saved_models/sms/tfidf_vectorizer.pkl")

print("SMS Engine Ready!")


def scan_sms(message):

    message = message.strip()
    message_lower = message.lower()

    # Convert message into TF-IDF vector
    sms_vector = vectorizer.transform([message])

    # ML prediction
    ml_prediction = model.predict(sms_vector)[0].upper()

    # ML confidence
    ml_confidence = model.predict_proba(sms_vector).max() * 100

    # ---------------------------------------------------------
    # SUSPICIOUS KEYWORDS
    # ---------------------------------------------------------

    suspicious_keywords = [
        "otp",
        "verify",
        "verification",
        "bank",
        "account",
        "password",
        "login",
        "click",
        "winner",
        "free",
        "gift",
        "reward",
        "urgent",
        "claim",
        "limited",
        "offer",
        "prize",
        "blocked",
        "suspended",
        "confirm",
        "security",
        "payment",
        "refund",
        "cash",
        "bonus"
    ]

    # ---------------------------------------------------------
    # HIGH-RISK COMBINATIONS
    # ---------------------------------------------------------

    high_risk_combinations = [
        ("bank", "verify"),
        ("bank", "click"),
        ("bank", "blocked"),
        ("account", "verify"),
        ("account", "login"),
        ("account", "suspended"),
        ("otp", "verify"),
        ("otp", "login"),
        ("otp", "claim"),
        ("password", "login"),
        ("password", "verify"),
        ("reward", "claim"),
        ("reward", "click"),
        ("prize", "claim"),
        ("prize", "click"),
        ("winner", "claim"),
        ("winner", "click"),
        ("free", "gift"),
        ("urgent", "verify"),
        ("urgent", "click")
    ]

    # ---------------------------------------------------------
    # FIND SUSPICIOUS KEYWORDS
    # ---------------------------------------------------------

    detected_keywords = []

    for word in suspicious_keywords:
        if word in message_lower:
            detected_keywords.append(word)

    # ---------------------------------------------------------
    # CHECK URL
    # ---------------------------------------------------------

    contains_url = (
        "http://" in message_lower
        or "https://" in message_lower
        or "www." in message_lower
    )

    # ---------------------------------------------------------
    # CHECK HIGH-RISK COMBINATIONS
    # ---------------------------------------------------------

    detected_combinations = []

    for word1, word2 in high_risk_combinations:

        if word1 in message_lower and word2 in message_lower:

            detected_combinations.append(
                f"High-risk combination detected: {word1} + {word2}"
            )

    # ---------------------------------------------------------
    # RULE-BASED RISK SCORE
    # ---------------------------------------------------------

    risk_score = 0

    # Each suspicious keyword contributes to risk
    risk_score += len(detected_keywords) * 8

    # URL increases risk
    if contains_url:
        risk_score += 20

    # High-risk combinations have stronger weight
    risk_score += len(detected_combinations) * 20

    # Limit score to 100
    risk_score = min(risk_score, 100)

    # ---------------------------------------------------------
    # FINAL PREDICTION
    # ---------------------------------------------------------

    prediction = ml_prediction

    # Strong rule-based detection
    if len(detected_combinations) >= 1:

        prediction = "SPAM"

    elif len(detected_keywords) >= 4:

        prediction = "SPAM"

    elif contains_url and len(detected_keywords) >= 2:

        prediction = "SPAM"

    # ---------------------------------------------------------
    # FINAL CONFIDENCE
    # ---------------------------------------------------------

    if prediction == "SPAM":

        # Combine ML confidence and rule-based confidence
        confidence = max(
            ml_confidence,
            risk_score
        )

        # Make sure obvious rule-based spam has strong confidence
        if risk_score >= 60:
            confidence = max(confidence, 90)

    else:

        confidence = ml_confidence

    confidence = min(confidence, 99.9)

    # ---------------------------------------------------------
    # REASONS
    # ---------------------------------------------------------

    reasons = []

    # Keyword reasons
    for word in detected_keywords:

        reasons.append(
            f"Suspicious keyword detected: {word}"
        )

    # URL reason
    if contains_url:

        reasons.append(
            "Contains suspicious URL"
        )

    # Combination reasons
    for combination in detected_combinations:

        reasons.append(combination)

    # ML reason
    if ml_prediction == prediction:

        if prediction == "SPAM":

            reasons.append(
                "Detected by Machine Learning model"
            )

        else:

            if len(reasons) == 0:

                reasons.extend([
                    "Looks like a normal message",
                    "No suspicious content detected"
                ])

    else:

        reasons.append(
            f"Rule-based security analysis overrode ML prediction ({ml_prediction})"
        )

    # ---------------------------------------------------------
    # RETURN RESULT
    # ---------------------------------------------------------

    return {

        "prediction": prediction,

        "confidence": round(confidence, 2),

        "reasons": reasons

    }

