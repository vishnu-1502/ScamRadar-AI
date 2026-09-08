import { useState } from "react";
import { saveScan } from "../utils/scanHistory";

import {
  ShieldCheck,
  Link2,
  Search,
  ArrowRight,
  Lock,
  Zap,
  Eye,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";


function URLScanner() {

  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");


  const handleScan = async () => {

    const trimmedUrl = url.trim();


    // ==========================
    // EMPTY INPUT VALIDATION
    // ==========================

    if (!trimmedUrl) {

      setResult(null);

      setError("Please enter a URL first.");

      return;
    }


    // ==========================
    // URL FORMAT VALIDATION
    // ==========================

    let parsedUrl;

    try {

      parsedUrl = new URL(trimmedUrl);

    } catch (error) {

      setResult(null);

      setError(
        "Please enter a valid URL, for example: https://example.com"
      );

      return;
    }


    // ==========================
    // HTTP / HTTPS VALIDATION
    // ==========================

    if (
      parsedUrl.protocol !== "http:" &&
      parsedUrl.protocol !== "https:"
    ) {

      setResult(null);

      setError(
        "Only HTTP and HTTPS URLs are supported."
      );

      return;
    }


    setIsScanning(true);
    setError("");
    setResult(null);


    try {

      // ==========================
      // SEND URL TO BACKEND
      // ==========================

      const response = await fetch(
        "http://127.0.0.1:5000/scan-url",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            url: trimmedUrl,
          }),
        }
      );


      // ==========================
      // HANDLE HTTP ERRORS
      // ==========================

      if (!response.ok) {

        let errorMessage =
          "Unable to scan the URL.";

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
          "The backend returned an invalid response."
        );
      }


      // ==========================
      // VALIDATE RESULT
      // ==========================

      if (!data || !data.prediction) {

        throw new Error(
          "The URL scanner returned an unexpected result."
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
          type: "URL",
          target: trimmedUrl,
          prediction: scanResult.prediction,
          confidence: confidence,
          reasons: scanResult.reasons,
        });


        if (!savedScan) {

          console.error(
            "URL scan result could not be saved."
          );

        } else {

          console.log(
            "URL scan saved successfully."
          );

        }

      } catch (saveError) {

        // Saving history should not make
        // a successful scan fail.

        console.error(
          "Error saving URL scan history:",
          saveError
        );

      }

    } catch (scanError) {

      console.error(
        "URL scan error:",
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
          "Something went wrong while scanning the URL. Please try again."
        );

      }

    } finally {

      setIsScanning(false);

    }

  };


  const isBenign =
    result?.prediction === "BENIGN";


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

            <Link2 size={14} />

            URL SECURITY SCANNER

          </div>


          <h1>

            Check Before

            <br />

            You{" "}

            <span className="blue-text">
              Click.
            </span>

          </h1>


          <p>

            Scan any website URL with ScamRadar AI and detect phishing,
            malicious domains, and suspicious activity before you visit.

          </p>


        </section>



        {/* ================= INPUT CARD ================= */}

        <section className="url-input-card">


          <div className="input-card-header">


            <div>

              <h2>
                Scan a Website
              </h2>


              <p>
                Enter the URL you want ScamRadar AI to analyze.
              </p>

            </div>


            <div className="secure-badge">

              <Lock size={13} />

              Secure Scan

            </div>


          </div>



          <div className="url-input-wrapper">


            <div className="url-input-icon">

              <Link2 size={20} />

            </div>


            <input
              type="text"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);

                if (error) {
                  setError("");
                }
              }}
              placeholder="https://example.com"
              aria-label="Website URL"
              onKeyDown={(event) => {

                if (event.key === "Enter") {

                  handleScan();

                }

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
                : "Scan URL"}

            </button>


          </div>



          <div className="input-hint">


            <span>

              <Lock size={12} />

              Your URL is analyzed securely.

            </span>


            <span>
              Supported: HTTP / HTTPS
            </span>


          </div>


        </section>



        {/* ================= RESULT CARD ================= */}

        <section
          className={`url-result-card ${
            result
              ? isBenign
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
                    ? isBenign
                      ? "result-icon-safe"
                      : "result-icon-danger"
                    : ""
                }`}
              >

                {result ? (

                  isBenign ? (

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
                  isBenign
                    ? "status-safe"
                    : "status-danger"
                }`}
              >

                {isBenign ? (

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
                  isBenign
                    ? "result-main-safe"
                    : "result-main-danger"
                }`}
              >


                <div className="result-main-icon">


                  {isBenign ? (

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

                    {isBenign
                      ? "This website appears to be safe based on the security analysis."
                      : "This website shows suspicious characteristics and may be unsafe."}

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
                    {confidenceValue(result.confidence)}%
                  </strong>


                </div>



                <div className="confidence-bar">


                  <div
                    className={`confidence-fill ${
                      isBenign
                        ? "confidence-safe"
                        : "confidence-danger"
                    }`}
                    style={{
                      width: `${confidenceValue(
                        result.confidence
                      )}%`,
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

                    {isBenign
                      ? "Why this URL looks safe"
                      : "Why we flagged this URL"}

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
                            isBenign
                              ? "reason-safe"
                              : "reason-danger"
                          }`}
                          key={index}
                        >


                          <div className="reason-icon">


                            {isBenign ? (

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
                        isBenign
                          ? "reason-safe"
                          : "reason-danger"
                      }`}
                    >

                      <div className="reason-icon">

                        {isBenign ? (

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

            /* ================= EMPTY RESULT ================= */

            <div className="result-placeholder">


              <div className="placeholder-icon">

                <AlertTriangle size={28} />

              </div>


              <h3>
                No scan performed yet
              </h3>


              <p>

                Enter a website URL above and click
                <strong> Scan URL </strong>
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
                Intelligent URL analysis
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
                Detect suspicious websites
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


// ==========================
// CONFIDENCE HELPER
// ==========================

function confidenceValue(value) {

  return Math.min(
    Math.max(
      Number(value) || 0,
      0
    ),
    100
  );

}


export default URLScanner;