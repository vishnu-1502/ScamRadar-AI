from ml.engine.sms_engine import scan_sms

message = input("Enter SMS:\n")

result = scan_sms(message)

print("\nPrediction :", result["prediction"])
print("Confidence :", result["confidence"])

print("\nReasons:")

for reason in result["reasons"]:
    print("-", reason)