# ScamRadar AI

### AI-Powered Cyber Fraud Detection and Advisory Platform

ScamRadar AI is a full-stack cybersecurity application that uses **Machine Learning and security rule analysis** to detect potentially fraudulent digital content.

The platform allows users to analyze **URLs, SMS messages, and email content** and receive a prediction, confidence score, and detection reasons.

## Features

* 🔗 **URL Scanner** – Detects potentially malicious and suspicious URLs.
* 📱 **SMS Scanner** – Identifies spam and potentially fraudulent messages.
* 📧 **Email Scanner** – Analyzes email content for suspicious messages.
* 🔐 **User Authentication** – Registration, login, password hashing, and logout.
* 📊 **Dashboard** – Displays scan statistics and recent scan history.
* 🗄️ **MongoDB Storage** – Stores user accounts and scan history.

## Technology Stack

**Frontend**

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router

**Backend**

* Python
* Flask
* Flask-CORS

**Machine Learning**

* Scikit-learn
* Pandas
* NumPy
* NLTK
* TextBlob
* Joblib

**Database**

* MongoDB
* PyMongo

## Project Structure

```text
ScamRadar-AI/
├── frontend/       # React frontend
├── ml/             # Machine learning engines and models
├── datasets/       # Training datasets
├── routes/         # Flask API routes
├── app.py          # Flask application
├── database.py     # MongoDB configuration
└── README.md
```

## How to Run

### Backend

From the project root:

```bash
py -3.10 app.py
```

Backend:

```text
http://127.0.0.1:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
```

Do not upload `.env` to GitHub.

## Important Note

The trained URL model `ml/models/url_model.pkl` is approximately **725 MB**, which exceeds GitHub's 100 MB file limit. Therefore, it is intentionally excluded from the repository and must be available locally when running the URL scanner.

## Future Enhancements

* Real-time threat intelligence
* Improved phishing detection
* Browser extension integration
* Cloud deployment
* Advanced security analytics
* Larger and more diverse datasets

## Project

**ScamRadar AI**
AI-Powered Cyber Fraud Detection and Advisory Platform

Developed as an academic project for cybersecurity and machine learning.
