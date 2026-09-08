from flask import Blueprint, request, jsonify

from ml.engine.url_engine import scan_url

url_bp = Blueprint("url_bp", __name__)


@url_bp.route("/scan-url", methods=["POST"])
def scan_url_api():

    data = request.get_json()

    if not data:

        return jsonify({
            "error": "No JSON data received."
        }), 400

    url = data.get("url")

    if not url:

        return jsonify({
            "error": "URL is required."
        }), 400

    result = scan_url(url)

    return jsonify(result)