import { useState } from "react";

import {
  ShieldCheck,
  Mail,
  Search,
  ArrowRight,
  Lock,
  Zap,
  Eye,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { saveScan } from "../utils/scanHistory";

function EmailScanner() {
  const [email, setEmail] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleScan = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setResult(null);
      setError("Please enter an email message first.");
      return;
    }

    setIsScanning(true);
    setError("");
    setResult(null);

    try {
      // ==========================
      // SCAN EMAIL
      // ==========================

      const response = await fetch(
        "http://127.0.0.1:5000/scan-email",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: trimmedEmail,
          }),
        }
      );

      // ==========================
      // HANDLE BACKEND ERRORS
      // ==========================

      if (!response.ok) {
        let errorMessage = "Unable to scan the email.";

        try {
          const errorData = await response.json();

          if (errorData?.error) {
            errorMessage = errorData.error;
          }

          if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch (jsonError) {
          console.error(
            "Could not read backend error response:",
            jsonError
          );
        }

        throw new Error(errorMessage);
      }

      // ==========================
      // READ RESPONSE
      // ==========================

      let data;

      try {
        data = await response.json();
      } catch (jsonError) {
        console.error(
          "Invalid JSON response from backend:",
          jsonError
        );

        throw new Error(
          "The email scanner returned an invalid response."
        );
      }

      // ==========================
      // VALIDATE RESULT
      // ==========================

      if (!data || !data.prediction) {
        throw new Error(
          "The email scanner returned an unexpected result."
        );
      }

      // ==========================
      // NORMALIZE RESULT
      // ==========================

      const confidence = Math.min(
        Math.max(
          Number(data.confidence) || 0,
          0
        ),
        100
      );

      const scanResult = {
        ...data,
        confidence,
        reasons: Array.isArray(data.reasons)
          ? data.reasons
          : [],
      };

      // Show scan result immediately
      setResult(scanResult);

      // ==========================
      // SAVE SCAN TO MONGODB
      // ==========================

      try {
        const savedScan = await saveScan({
          type: "EMAIL",
          target: trimmedEmail,
          prediction: scanResult.prediction,
          confidence: scanResult.confidence,
          reasons: scanResult.reasons,
        });

        if (!savedScan) {
          console.error(
            "Email scan result could not be saved."
          );
        } else {
          console.log(
            "Email scan saved successfully."
          );
        }
      } catch (saveError) {
        // History failure should not remove the scan result
        console.error(
          "Error saving email scan history:",
          saveError
        );
      }

    } catch (scanError) {
      console.error(
        "Email scan error:",
        scanError
      );

      // ==========================
      // BACKEND CONNECTION ERROR
      // ==========================

      if (
        scanError instanceof TypeError &&
        scanError.message === "Failed to fetch"
      ) {
        setError(
          "Unable to connect to ScamRadar AI backend. Make sure the Flask server is running."
        );
      } else {
        setError(
          scanError.message ||
          "Something went wrong while scanning the email. Please try again."
        );
      }

    } finally {
      setIsScanning(false);
    }
  };

  const isHam =
    result?.prediction === "HAM";

  const confidence = result
    ? Math.min(
        Math.max(
          Number(result.confidence) || 0,
          0
        ),
        100
      )
    : 0;

  return (
    <div className="scanner-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="brand">

          <div className="brand-icon">
            <ShieldCheck size={22} />
          </div>

          <span>
            Scam
            <span className="brand-highlight">
              Radar
            </span>{" "}
            <span className="brand-ai">
              AI
            </span>
          </span>

        </div>

        <div className="nav-links">

          <a href="/home">
            Home
          </a>

          <a href="/dashboard">
            Dashboard
          </a>

          <a href="/about">
            About
          </a>

        </div>

        <a
          href="/dashboard"
          className="nav-button"
        >
          Get Started
          <ArrowRight size={16} />
        </a>

      </nav>


      {/* ================= MAIN CONTENT ================= */}

      <main className="scanner-container">

        {/* ================= HEADER ================= */}

        <section className="scanner-header">

          <div className="scanner-badge">

            <Mail size={14} />

            EMAIL SECURITY SCANNER

          </div>

          <h1>

            Check Before

            <br />

            You{" "}

            <span className="green-text">
              Trust.
            </span>

          </h1>

          <p>

            Scan any email with ScamRadar AI and detect
            spam, phishing attempts, suspicious content,
            scam keywords, and malicious links.

          </p>

        </section>


        {/* ================= INPUT CARD ================= */}

        <section className="url-input-card">

          <div className="input-card-header">

            <div>

              <h2>
                Scan an Email
              </h2>

              <p>
                Enter the email content you want ScamRadar AI
                to analyze.
              </p>

            </div>

            <div className="secure-badge">

              <Lock size={13} />

              Secure Scan

            </div>

          </div>


          {/* ================= EMAIL INPUT ================= */}

          <div className="email-input-wrapper">

            <div className="email-input-icon">

              <Mail size={20} />

            </div>

            <textarea
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="Paste the email content here..."
              aria-label="Email content"
              rows={1}
              className="email-textarea"
              onInput={(event) => {

                event.currentTarget.style.height =
                  "48px";

                event.currentTarget.style.height =
                  `${event.currentTarget.scrollHeight}px`;

              }}
            />

            <button
              className="scan-button"
              onClick={handleScan}
              disabled={isScanning}
            >

              <Search size={18} />

              {isScanning
                ? "Scanning..."
                : "Scan Email"}

            </button>

          </div>


          <div className="input-hint">

            <span>

              <Lock size={12} />

              Your email is analyzed securely.

            </span>

            <span>

              Supported: Text / Links / Phishing Emails

            </span>

          </div>

        </section>


        {/* ================= RESULT CARD ================= */}

        <section
          className={`url-result-card ${
            result
              ? isHam
                ? "result-card-safe"
                : "result-card-danger"
              : ""
          }`}
        >

          {/* ================= RESULT HEADER ================= */}

          <div className="result-header">

            <div className="result-title">

              <div
                className={`result-icon ${
                  result
                    ? isHam
                      ? "result-icon-safe"
                      : "result-icon-danger"
                    : ""
                }`}
              >

                {result ? (

                  isHam ? (

                    <CheckCircle2 size={21} />

                  ) : (

                    <AlertTriangle size={21} />

                  )

                ) : (

                  <ShieldCheck size={21} />

                )}

              </div>

              <div>

                <h2>
                  Scan Result
                </h2>

                <p>

                  {result
                    ? "Security analysis completed."
                    : "Results will appear here after scanning."}

                </p>

              </div>

            </div>


            {result ? (

              <span
                className={`result-status-badge ${
                  isHam
                    ? "status-safe"
                    : "status-danger"
                }`}
              >

                {isHam ? (

                  <CheckCircle2 size={13} />

                ) : (

                  <AlertTriangle size={13} />

                )}

                {result.prediction}

              </span>

            ) : (

              <span className="waiting-badge">

                <Eye size={13} />

                Waiting for scan

              </span>

            )}

          </div>


          {/* ================= ERROR ================= */}

          {error && (

            <div className="scan-error">

              <AlertTriangle size={18} />

              <span>
                {error}
              </span>

            </div>

          )}


          {/* ================= RESULT ================= */}

          {result ? (

            <div className="scan-result-content">

              {/* ================= SECURITY VERDICT ================= */}

              <div
                className={`result-main ${
                  isHam
                    ? "result-main-safe"
                    : "result-main-danger"
                }`}
              >

                <div className="result-main-icon">

                  {isHam ? (

                    <CheckCircle2 size={32} />

                  ) : (

                    <AlertTriangle size={32} />

                  )}

                </div>

                <div className="result-verdict-text">

                  <span className="result-label">
                    SECURITY VERDICT
                  </span>

                  <h3>
                    {result.prediction}
                  </h3>

                  <p>

                    {isHam

                      ? "This email appears to be safe based on the security analysis."

                      : "This email shows suspicious characteristics and may be spam or a phishing attempt."}

                  </p>

                </div>

              </div>


              {/* ================= CONFIDENCE ================= */}

              <div className="confidence-box">

                <div className="confidence-top">

                  <span>
                    Confidence
                  </span>

                  <strong>
                    {confidence.toFixed(2)}%
                  </strong>

                </div>

                <div className="confidence-bar">

                  <div
                    className={`confidence-fill ${
                      isHam
                        ? "confidence-safe"
                        : "confidence-danger"
                    }`}
                    style={{
                      width: `${confidence}%`,
                    }}
                  />

                </div>

                <div className="confidence-scale">

                  <span>
                    0%
                  </span>

                  <span>
                    50%
                  </span>

                  <span>
                    100%
                  </span>

                </div>

              </div>


              {/* ================= ANALYSIS DETAILS ================= */}

              <div className="reasons-section">

                <div className="reasons-heading">

                  <h4>

                    {isHam
                      ? "Why this email looks safe"
                      : "Why we flagged this email"}

                  </h4>

                  <span>

                    {result.reasons?.length || 0} checks

                  </span>

                </div>

                <div className="reasons-list">

                  {result.reasons?.map(
                    (reason, index) => (

                      <div
                        className={`reason-item ${
                          isHam
                            ? "reason-safe"
                            : "reason-danger"
                        }`}
                        key={index}
                      >

                        <div className="reason-icon">

                          {isHam ? (

                            <CheckCircle2 size={15} />

                          ) : (

                            <AlertTriangle size={15} />

                          )}

                        </div>

                        <span>
                          {reason}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

          ) : !error ? (

            <div className="result-placeholder">

              <div className="placeholder-icon">

                <AlertTriangle size={28} />

              </div>

              <h3>
                No scan performed yet
              </h3>

              <p>

                Enter an email above and click

                <strong>
                  {" "}Scan Email{" "}
                </strong>

                to analyze it.

              </p>

            </div>

          ) : null}

        </section>


        {/* ================= SECURITY FEATURES ================= */}

        <section className="scanner-features">

          <div className="feature-item">

            <div className="feature-icon">

              <Zap size={19} />

            </div>

            <div>

              <strong>
                AI-Powered
              </strong>

              <span>
                Intelligent email analysis
              </span>

            </div>

          </div>


          <div className="feature-item">

            <div className="feature-icon">

              <ShieldCheck size={19} />

            </div>

            <div>

              <strong>
                Phishing Detection
              </strong>

              <span>
                Detect suspicious emails
              </span>

            </div>

          </div>


          <div className="feature-item">

            <div className="feature-icon">

              <Eye size={19} />

            </div>

            <div>

              <strong>
                Real-Time Analysis
              </strong>

              <span>
                Fast security results
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default EmailScanner;