import { useState } from "react";

import {
  ShieldCheck,
  MessageSquare,
  Search,
  ArrowRight,
  Lock,
  Zap,
  Eye,
  AlertTriangle,
  CheckCircle2,
  BrainCircuit,
} from "lucide-react";

import { saveScan } from "../utils/scanHistory";


function SMSScanner() {

  const [sms, setSms] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");


  const handleScan = async () => {

    const trimmedSms = sms.trim();


    // ==========================
    // EMPTY INPUT VALIDATION
    // ==========================

    if (!trimmedSms) {

      setResult(null);

      setError(
        "Please enter an SMS message first."
      );

      return;
    }


    setIsScanning(true);
    setError("");
    setResult(null);


    try {

      // ==========================
      // SEND SMS TO BACKEND
      // ==========================

      const response = await fetch(
        "http://127.0.0.1:5000/scan-sms",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sms: trimmedSms,
          }),
        }
      );


      // ==========================
      // HANDLE HTTP ERRORS
      // ==========================

      if (!response.ok) {

        let errorMessage =
          "Unable to scan the SMS.";

        try {

          const errorData =
            await response.json();

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
      // READ BACKEND RESPONSE
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
          "The backend returned an invalid response."
        );
      }


      // ==========================
      // VALIDATE RESULT
      // ==========================

      if (!data || !data.prediction) {

        throw new Error(
          "The SMS scanner returned an unexpected result."
        );
      }


      // ==========================
      // NORMALIZE CONFIDENCE
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


      setResult(scanResult);


      // ==========================
      // SAVE SCAN TO MONGODB
      // ==========================

      try {

        const savedScan = await saveScan({
          type: "SMS",
          target: trimmedSms,
          prediction: scanResult.prediction,
          confidence: confidence,
          reasons: scanResult.reasons,
        });


        if (!savedScan) {

          console.error(
            "SMS scan result could not be saved."
          );

        } else {

          console.log(
            "SMS scan saved successfully."
          );

        }

      } catch (saveError) {

        // Saving history should not make
        // a successful scan fail.

        console.error(
          "Error saving SMS scan history:",
          saveError
        );

      }

    } catch (scanError) {

      console.error(
        "SMS scan error:",
        scanError
      );


      // ==========================
      // USER-FRIENDLY ERROR
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
          "Something went wrong while scanning the SMS. Please try again."
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

            <MessageSquare size={14} />

            SMS SECURITY SCANNER

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

            Scan any SMS message with ScamRadar AI and detect
            spam, suspicious content, scam keywords, and malicious
            links before you respond.

          </p>


        </section>



        {/* ================= INPUT CARD ================= */}

        <section className="url-input-card">


          <div className="input-card-header">


            <div>

              <h2>
                Scan an SMS Message
              </h2>


              <p>
                Enter the SMS message you want ScamRadar AI to analyze.
              </p>

            </div>


            <div className="secure-badge">

              <Lock size={13} />

              Secure Scan

            </div>


          </div>



          {/* ================= SMS INPUT ================= */}

          <div className="url-input-wrapper">


            <div className="url-input-icon">

              <MessageSquare size={20} />

            </div>


            <textarea
              value={sms}
              onChange={(event) => {

                setSms(event.target.value);

                if (error) {
                  setError("");
                }

              }}
              placeholder="Enter your SMS message here..."
              aria-label="SMS message"
              rows={1}
              onKeyDown={(event) => {

                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {

                  event.preventDefault();

                  handleScan();

                }

              }}
            />


            <button
              className="scan-button"
              onClick={handleScan}
              disabled={isScanning}
            >

              {isScanning ? (

                <>
                  <Search size={18} />

                  Scanning...

                </>

              ) : (

                <>
                  <Search size={18} />

                  Scan SMS

                </>

              )}

            </button>


          </div>



          <div className="input-hint">


            <span>

              <Lock size={12} />

              Your message is analyzed securely.

            </span>


            <span>

              Supported: Text / Links / OTP Messages

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
                  SMS Security Analysis
                </h2>


                <p>

                  {result
                    ? "Security analysis completed successfully."
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


                {isHam
                  ? "SAFE"
                  : "SPAM DETECTED"}

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

                    {isHam
                      ? "MESSAGE APPEARS SAFE"
                      : "SPAM DETECTED"}

                  </h3>


                  <p>

                    {isHam
                      ? "No significant spam or scam indicators were detected in this message."
                      : "This message contains characteristics commonly associated with spam, scams, or suspicious activity."}

                  </p>


                </div>


              </div>



              {/* ================= DETECTION METHOD ================= */}

              <div
                style={{
                  marginTop: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "11px 13px",
                  borderRadius: "9px",
                  background: "rgba(37, 99, 235, 0.045)",
                  border: "1px solid rgba(59, 130, 246, 0.1)",
                  color: "#64748b",
                  fontSize: "9px",
                }}
              >

                <BrainCircuit
                  size={16}
                  style={{
                    color: "#38bdf8",
                  }}
                />


                <span>

                  <strong
                    style={{
                      color: "#94a3b8",
                    }}
                  >
                    Detection Engine:
                  </strong>{" "}

                  Machine Learning + Security Rule Analysis

                </span>


              </div>



              {/* ================= CONFIDENCE ================= */}

              <div className="confidence-box">


                <div className="confidence-top">


                  <span>
                    Detection Confidence
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



              {/* ================= REASONS ================= */}

              <div className="reasons-section">


                <div className="reasons-heading">


                  <h4>

                    {isHam
                      ? "Why this message looks safe"
                      : "Why we flagged this message"}

                  </h4>


                  <span>

                    {result.reasons?.length || 0} checks

                  </span>


                </div>



                <div className="reasons-list">


                  {result.reasons?.length > 0 ? (

                    result.reasons.map(
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
                    )

                  ) : (

                    <div
                      className={`reason-item ${
                        isHam
                          ? "reason-safe"
                          : "reason-danger"
                      }`}
                    >

                      <div className="reason-icon">

                        {isHam ? (

                          <CheckCircle2 size={15} />

                        ) : (

                          <AlertTriangle size={15} />

                        )}

                      </div>


                      <span>
                        No additional analysis details were provided.
                      </span>


                    </div>

                  )}


                </div>


              </div>


            </div>

          ) : !error ? (

            <div className="result-placeholder">


              <div className="placeholder-icon">

                <MessageSquare size={28} />

              </div>


              <h3>
                No scan performed yet
              </h3>


              <p>

                Enter an SMS message above and click
                <strong> Scan SMS </strong>
                to analyze its security risk.

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
                Intelligent SMS analysis
              </span>

            </div>


          </div>



          <div className="feature-item">


            <div className="feature-icon">

              <ShieldCheck size={19} />

            </div>


            <div>

              <strong>
                Spam Detection
              </strong>


              <span>
                Detect suspicious messages
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


export default SMSScanner;