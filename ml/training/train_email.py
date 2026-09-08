import pandas as pd

print("Loading Email Dataset...")

data = pd.read_csv("datasets/email/emails.csv")

print("\nFirst 5 Rows:")
print(data.head())

print("\nDataset Shape:")
print(data.shape)

print("\nColumn Names:")
print(data.columns)

print("\nDataset Info:")
print(data.info())

print("\nClass Distribution:")
print(data.iloc[:, -1].value_counts())