from flask import Blueprint, request, jsonify

from ml.engine.email_engine import scan_email

email_bp = Blueprint("email_bp", __name__)


@email_bp.route("/scan-email", methods=["POST"])
def scan_email_api():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No JSON data received."
        }), 400

    email = data.get("email")

    if not email:
        return jsonify({
            "error": "Email content is required."
        }), 400

    result = scan_email(email)

    return jsonify(result)