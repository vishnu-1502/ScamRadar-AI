from ml.engine.url_engine import scan_url

url = input("Enter URL: ")

result = scan_url(url)

print("\nPrediction :", result["prediction"])
print("Confidence :", result["confidence"])

print("\nReasons:")

for reason in result["reasons"]:
    print("-", reason)