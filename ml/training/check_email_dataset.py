import pandas as pd

print("Loading Email Dataset...")

data = pd.read_csv("datasets/email/spam_assassin.csv")

print("\nFirst 5 Rows:\n")
print(data.head())

print("\nDataset Shape:")
print(data.shape)

print("\nColumn Names:")
print(data.columns)

print("\nDataset Info:")
print(data.info())

print("\nClass Distribution:")

# Replace "label" with the actual label column if needed
print(data["target"].value_counts())