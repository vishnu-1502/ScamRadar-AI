import pandas as pd
from ml.preprocessing.sms_preprocessing import clean_text

# Dataset path
dataset_path = "datasets/sms/SMSSpamCollection"

# Read the dataset
data = pd.read_csv(
    dataset_path,
    sep="\t",
    header=None,
    names=["label", "message"]
)

# Display first 5 rows
print("First 5 Rows:\n")
print(data.head())

# Display dataset shape
print("\nDataset Shape:")
print(data.shape)

# Display column names
print("\nColumn Names:")
print(data.columns)

# Display dataset information
print("\nDataset Information:")
print(data.info())

# Display class distribution
print("\nClass Distribution:")
print(data["label"].value_counts())

# Check duplicate messages
print("\nDuplicate Messages:")
print(data.duplicated().sum())

# Remove duplicate messages
data = data.drop_duplicates()

print("\nDataset Shape After Removing Duplicates:")
print(data.shape)

# Display first 10 SMS messages
print("\nFirst 10 SMS Messages:\n")

for i in range(10):
    print(f"Message {i+1}:")
    print("Label :", data.iloc[i]["label"])
    print("Text  :", data.iloc[i]["message"])
    print("-" * 80)

# ----------------------------------------------------
# Text Cleaning Demo
# ----------------------------------------------------

print("\n==============================")
print("TEXT CLEANING DEMO")
print("==============================")

sample_text = data.iloc[2]["message"]

print("\nOriginal Text:\n")
print(sample_text)

print("\nCleaned Text:\n")
print(clean_text(sample_text))