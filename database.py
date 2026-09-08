import os

from dotenv import load_dotenv
from pymongo import MongoClient


# ==========================
# Load Environment Variables
# ==========================

load_dotenv()


# ==========================
# MongoDB URI
# ==========================

mongo_uri = os.getenv("MONGO_URI")

if not mongo_uri:
    raise RuntimeError("MONGO_URI is not set in the .env file.")


# ==========================
# MongoDB Connection
# ==========================

mongo_client = MongoClient(
    mongo_uri,
    serverSelectionTimeoutMS=10000
)


# ==========================
# ScamRadar AI Database
# ==========================

db = mongo_client["scamradar_ai"]


# ==========================
# Collections
# ==========================

users_collection = db["users"]

scans_collection = db["scans"]


print("MongoDB Client Initialized Successfully!")