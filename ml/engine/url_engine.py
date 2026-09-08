import joblib
import pandas as pd

from ml.preprocessing.url_preprocessing import (
    extract_url_features
)

from ml.utils.trusted_domains import is_trusted

from ml.utils.typosquatting import is_typosquatting


# ==========================================
# LOAD MODEL
# ==========================================

print("Loading URL Engine...")

model = joblib.load(
    "ml/models/url_model.pkl"
)

label_encoder = joblib.load(
    "ml/models/url_label_encoder.pkl"
)

feature_names = joblib.load(
    "ml/models/url_feature_names.pkl"
)

print("URL Engine Ready!")


# ==========================================
# MAIN URL SCANNING FUNCTION
# ==========================================

def scan_url(url):

    url = str(url).strip()

    # ======================================
    # EMPTY URL CHECK
    # ======================================

    if not url:

        return {
            "prediction": "UNKNOWN",
            "confidence": 0.0,
            "reasons": [
                "Please enter a valid URL"
            ]
        }


    # ======================================
    # TRUSTED WEBSITE CHECK
    # ======================================

    if is_trusted(url):

        return {
            "prediction": "BENIGN",
            "confidence": 100.0,
            "reasons": [
                "Trusted Website",
                "Official Domain",
                "No suspicious activity detected"
            ]
        }


    # ======================================
    # TYPOSQUATTING CHECK
    # ======================================

    fake_domain = is_typosquatting(url)

    if fake_domain:

        return {
            "prediction": "PHISHING",
            "confidence": 99.0,
            "reasons": [
                f"Looks similar to trusted website: {fake_domain}",
                "Possible Fake Website (Typosquatting)",
                "Designed to trick users"
            ]
        }


    # ======================================
    # MACHINE LEARNING ANALYSIS
    # ======================================

    extracted_features = extract_url_features(
        url
    )


    # Convert features to DataFrame
    # using exactly the same order as training

    url_features = pd.DataFrame(
        [extracted_features],
        columns=feature_names
    )


    # ======================================
    # MODEL PREDICTION
    # ======================================

    prediction = model.predict(
        url_features
    )[0]


    # ======================================
    # CONFIDENCE
    # ======================================

    probabilities = model.predict_proba(
        url_features
    )[0]

    confidence = probabilities.max() * 100


    # ======================================
    # DECODE LABEL
    # ======================================

    label = label_encoder.inverse_transform(
        [prediction]
    )[0]

    label = label.upper()


    # ======================================
    # ANALYSIS REASONS
    # ======================================

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


    url_lower = url.lower()


    # Suspicious keywords

    for word in suspicious_keywords:

        if word in url_lower:

            reasons.append(
                f"Contains suspicious keyword: {word}"
            )


    # @ symbol

    if "@" in url:

        reasons.append(
            "@ symbol detected"
        )


    # Too many hyphens

    if url.count("-") >= 2:

        reasons.append(
            "Too many hyphens"
        )


    # Long URL

    if len(url) > 80:

        reasons.append(
            "URL is unusually long"
        )


    # Too many subdomains

    if url.count(".") > 4:

        reasons.append(
            "Too many subdomains"
        )


    # HTTP

    if url.lower().startswith(
        "http://"
    ):

        reasons.append(
            "Uses HTTP instead of HTTPS"
        )


    # ======================================
    # DEFAULT REASONS
    # ======================================

    if len(reasons) == 0:

        if label == "BENIGN":

            reasons.extend([

                "URL structure appears normal",

                "No suspicious keywords found",

                "Looks like a legitimate website"

            ])

        else:

            reasons.append(
                "Detected by Machine Learning"
            )


    # ======================================
    # FINAL RESULT
    # ======================================

    return {

        "prediction": label,

        "confidence": round(
            confidence,
            2
        ),

        "reasons": reasons

    }