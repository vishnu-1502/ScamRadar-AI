from ml.engine.email_engine import scan_email

email = input("Paste Email:\n")

result = scan_email(email)

print("\nPrediction :", result["prediction"])
print("Confidence :", result["confidence"])

print("\nReasons:")

for reason in result["reasons"]:
    print("-", reason)