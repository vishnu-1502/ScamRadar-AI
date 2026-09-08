from flask import Blueprint, request, jsonify
import bcrypt

from database import users_collection


auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


# ==========================
# Register
# ==========================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # Validate fields
    if not name or not email or not password:
        return jsonify({
            "message": "Name, email and password are required"
        }), 400

    # Check existing user
    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "message": "Email already registered"
        }), 409

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    # Create user
    user = {
        "name": name,
        "email": email,
        "password": hashed_password.decode("utf-8")
    }

    users_collection.insert_one(user)

    # Return newly registered user information
    return jsonify({
        "message": "Registration successful",
        "user": {
            "name": name,
            "email": email
        }
    }), 201


# ==========================
# Login
# ==========================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # Validate fields
    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    # Find user
    user = users_collection.find_one({
        "email": email
    })

    if not user:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    # Check password
    password_match = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    )

    if not password_match:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    }), 200