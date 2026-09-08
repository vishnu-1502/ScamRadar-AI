from flask import Flask
from flask_cors import CORS

from routes.url_routes import url_bp
from routes.sms_routes import sms_bp
from routes.email_routes import email_bp
from routes.auth_routes import auth_bp
from routes.history_routes import history_bp


app = Flask(__name__)


# ==========================
# CORS CONFIGURATION
# ==========================

CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
            ]
        }
    },
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


# ==========================
# REGISTER BLUEPRINTS
# ==========================

app.register_blueprint(url_bp)
app.register_blueprint(sms_bp)
app.register_blueprint(email_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(history_bp)


# ==========================
# HOME ROUTE
# ==========================

@app.route("/")
def home():
    return {
        "message": "Welcome to ScamRadar AI API",
        "status": "Running Successfully"
    }


# ==========================
# START SERVER
# ==========================

if __name__ == "__main__":
    app.run(debug=True)