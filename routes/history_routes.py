from flask import Blueprint, request, jsonify
from datetime import datetime, timezone

from database import scans_collection


history_bp = Blueprint(
    "history",
    __name__,
    url_prefix="/api/history"
)


# ==========================
# SAVE SCAN
# ==========================

@history_bp.route("/save", methods=["POST"])
def save_scan():

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    user_email = data.get("userEmail", "").strip().lower()
    scan_type = data.get("type", "").strip().upper()
    target = data.get("target", "").strip()
    prediction = data.get("prediction", "").strip().upper()
    confidence = data.get("confidence", 0)

    if not user_email:
        return jsonify({
            "message": "User email is required"
        }), 400

    if not scan_type:
        return jsonify({
            "message": "Scan type is required"
        }), 400

    if not target:
        return jsonify({
            "message": "Scan target is required"
        }), 400

    if not prediction:
        return jsonify({
            "message": "Prediction is required"
        }), 400


    # Store the scan time as timezone-aware UTC
    scan = {
        "userEmail": user_email,
        "type": scan_type,
        "target": target,
        "prediction": prediction,
        "confidence": confidence,
        "timestamp": datetime.now(timezone.utc)
    }


    scans_collection.insert_one(scan)


    return jsonify({
        "message": "Scan saved successfully"
    }), 201


# ==========================
# GET USER SCAN HISTORY
# ==========================

@history_bp.route("/<email>", methods=["GET"])
def get_history(email):

    user_email = email.strip().lower()


    scans = scans_collection.find(
        {
            "userEmail": user_email
        }
    ).sort(
        "timestamp",
        -1
    )


    history = []


    for scan in scans:

        timestamp = scan.get("timestamp")


        # MongoDB/PyMongo may return the stored UTC
        # datetime as a naive datetime.
        #
        # Explicitly mark it as UTC before sending
        # it to JavaScript.

        if timestamp:

            if timestamp.tzinfo is None:
                timestamp = timestamp.replace(
                    tzinfo=timezone.utc
                )

            timestamp = timestamp.isoformat()


        history.append({

            "id": str(
                scan["_id"]
            ),

            "type": scan.get(
                "type"
            ),

            "target": scan.get(
                "target"
            ),

            "prediction": scan.get(
                "prediction"
            ),

            "confidence": scan.get(
                "confidence"
            ),

            "timestamp": timestamp
        })


    return jsonify(history), 200