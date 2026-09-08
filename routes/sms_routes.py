from flask import Blueprint, request, jsonify

from ml.engine.sms_engine import scan_sms

sms_bp = Blueprint("sms_bp", __name__)


@sms_bp.route("/scan-sms", methods=["POST"])
def scan_sms_api():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No JSON data received."
        }), 400

    sms = data.get("sms")

    if not sms:
        return jsonify({
            "error": "SMS is required."
        }), 400

    result = scan_sms(sms)

    return jsonify(result)