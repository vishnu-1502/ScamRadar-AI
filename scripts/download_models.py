import os
import urllib.request


BASE_URL = (
    "https://github.com/vishnu-1502/ScamRadar-AI/"
    "releases/download/v1.0.0/"
)

MODEL_FILES = [
    "url_model.pkl",
    "url_vectorizer.pkl",
    "url_label_encoder.pkl",
    "url_feature_names.pkl",
]

MODEL_DIR = os.path.join("ml", "models")


def download_models():
    os.makedirs(MODEL_DIR, exist_ok=True)

    for filename in MODEL_FILES:
        destination = os.path.join(MODEL_DIR, filename)

        if os.path.exists(destination):
            print(f"{filename} already exists. Skipping download.")
            continue

        url = BASE_URL + filename

        print(f"Downloading {filename}...")

        try:
            urllib.request.urlretrieve(url, destination)
            print(f"Downloaded {filename} successfully.")
        except Exception as error:
            print(f"Failed to download {filename}: {error}")
            raise


if __name__ == "__main__":
    download_models()