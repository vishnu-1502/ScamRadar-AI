import { useEffect, useState } from "react";

import {
  ShieldCheck,
  Link2,
  MessageSquareText,
  Mail,
  ArrowRight,
  Activity,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ShieldAlert,
  LogOut,
} from "lucide-react";

import "../App.css";

import {
  getScanHistory,
  getScanStats,
} from "../utils/scanHistory";


function Dashboard() {

  const [scanHistory, setScanHistory] = useState([]);

  const [stats, setStats] = useState({
    totalScans: 0,
    safeContent: 0,
    threatsDetected: 0,
    lastScan: null,
  });


  // Load scan history and statistics
  useEffect(() => {

    const loadDashboardData = async () => {

      const history = await getScanHistory();

      const scanStats = await getScanStats();

      setScanHistory(history);

      setStats(scanStats);

    };

    loadDashboardData();

  }, []);


  // Logout
  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/login";

  };


  return (

    <div className="dashboard-page">


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


          {/* HOME */}

          <a href="/home">
            Home
          </a>


          {/* DASHBOARD */}

          <a
            href="/dashboard"
            className="active"
          >
            Dashboard
          </a>


          {/* ABOUT */}

          <a href="/about">
            About
          </a>


        </div>


        <div className="navbar-actions">


          <button
            type="button"
            className="nav-button"
            onClick={handleLogout}
          >

            <LogOut size={16} />

            Log Out

          </button>


        </div>


      </nav>


      {/* ================= DASHBOARD CONTENT ================= */}

      <main className="dashboard-container">


        {/* ================= HEADER ================= */}

        <section className="dashboard-header">


          <div>


            <div className="dashboard-badge">

              <Activity size={14} />

              SECURITY CENTER

            </div>


            <h1>

              Security{" "}

              <span className="blue-text">
                Dashboard
              </span>

            </h1>


            <p>

              Analyze suspicious content using ScamRadar AI's detection
              engines.

            </p>


          </div>


          <div className="security-status">

            <span className="status-dot"></span>


            <div>

              <strong>
                Protection Active
              </strong>

              <span>
                All systems operational
              </span>

            </div>

          </div>


        </section>


        {/* ================= QUICK STATS ================= */}

        <section className="dashboard-stats">


          {/* TOTAL SCANS */}

          <div className="dashboard-stat-card">


            <div className="dashboard-stat-icon blue-stat">

              <Activity size={20} />

            </div>


            <div>

              <span>
                Total Scans
              </span>

              <strong>
                {stats.totalScans}
              </strong>

            </div>


          </div>


          {/* SAFE CONTENT */}

          <div className="dashboard-stat-card">


            <div className="dashboard-stat-icon green-stat">

              <CheckCircle2 size={20} />

            </div>


            <div>

              <span>
                Safe Content
              </span>

              <strong>
                {stats.safeContent}
              </strong>

            </div>


          </div>


          {/* THREATS DETECTED */}

          <div className="dashboard-stat-card">


            <div className="dashboard-stat-icon red-stat">

              <ShieldAlert size={20} />

            </div>


            <div>

              <span>
                Threats Detected
              </span>

              <strong>
                {stats.threatsDetected}
              </strong>

            </div>


          </div>


          {/* LAST SCAN */}

          <div className="dashboard-stat-card">


            <div className="dashboard-stat-icon purple-stat">

              <Clock3 size={20} />

            </div>


            <div>

              <span>
                Last Scan
              </span>


              <strong>

                {stats.lastScan

                  ? new Date(
                      stats.lastScan
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })

                  : "No scans"}

              </strong>

            </div>


          </div>


        </section>


        {/* ================= SCANNER SECTION ================= */}

        <section className="scanner-section">


          <div className="dashboard-section-heading">


            <div>

              <h2>
                Choose a Scanner
              </h2>


              <p>
                Select the type of content you want ScamRadar AI to analyze.
              </p>

            </div>


            <span>
              3 Detection Engines
            </span>


          </div>


          <div className="dashboard-scanner-grid">


            {/* ================= URL SCANNER ================= */}

            <a
              href="/url-scanner"
              className="dashboard-scanner-card url-card"
            >


              <div className="scanner-card-top">


                <div className="dashboard-scanner-icon">

                  <Link2 size={27} />

                </div>


                <ArrowRight
                  size={19}
                  className="scanner-arrow"
                />


              </div>


              <h3>
                URL Scanner
              </h3>


              <p>

                Check websites and links for phishing, malicious domains,
                and suspicious activity.

              </p>


              <div className="scanner-card-footer">

                <span>
                  PHISHING DETECTION
                </span>

              </div>


            </a>


            {/* ================= SMS SCANNER ================= */}

            <a
              href="/sms-scanner"
              className="dashboard-scanner-card sms-card"
            >


              <div className="scanner-card-top">


                <div className="dashboard-scanner-icon">

                  <MessageSquareText size={27} />

                </div>


                <ArrowRight
                  size={19}
                  className="scanner-arrow"
                />


              </div>


              <h3>
                SMS Scanner
              </h3>


              <p>

                Analyze text messages and identify spam, scams, suspicious
                links, and fraudulent content.

              </p>


              <div className="scanner-card-footer">

                <span>
                  SPAM DETECTION
                </span>

              </div>


            </a>


            {/* ================= EMAIL SCANNER ================= */}

            <a
              href="/email-scanner"
              className="dashboard-scanner-card email-card"
            >


              <div className="scanner-card-top">


                <div className="dashboard-scanner-icon">

                  <Mail size={27} />

                </div>


                <ArrowRight
                  size={19}
                  className="scanner-arrow"
                />


              </div>


              <h3>
                Email Scanner
              </h3>


              <p>

                Analyze email content and detect spam, phishing attempts,
                suspicious links, and threats.

              </p>


              <div className="scanner-card-footer">

                <span>
                  EMAIL ANALYSIS
                </span>

              </div>


            </a>


          </div>


        </section>


        {/* ================= RECENT ACTIVITY ================= */}

        <section className="activity-section">


          <div className="dashboard-section-heading">


            <div>

              <h2>
                Recent Activity
              </h2>


              <p>
                Your latest security scans.
              </p>

            </div>


            <span>

              {scanHistory.length > 0

                ? `${scanHistory.length} Scans`

                : "No Activity"}

            </span>


          </div>


          <div className="activity-table">


            {/* ================= NO SCANS ================= */}

            {scanHistory.length === 0 ? (


              <div className="activity-empty">


                <Activity size={24} />


                <p>
                  No scans performed yet.
                </p>


                <span>

                  Start scanning URLs, SMS messages, or emails to see
                  your activity here.

                </span>


              </div>


            ) : (


              scanHistory

                .slice(0, 10)

                .map((scan) => {


                  const isSafe =

                    scan.prediction === "HAM" ||

                    scan.prediction === "BENIGN";


                  const Icon =

                    scan.type === "URL"

                      ? Link2

                      : scan.type === "SMS"

                      ? MessageSquareText

                      : Mail;


                  const activityClass =

                    scan.type === "URL"

                      ? "url-activity"

                      : scan.type === "SMS"

                      ? "sms-activity"

                      : "email-activity";


                  const resultClass =

                    isSafe

                      ? "ham-result"

                      : scan.prediction === "SPAM"

                      ? "spam-result"

                      : "phishing-result";


                  return (


                    <div
                      className="activity-row"
                      key={scan.id}
                    >


                      {/* TYPE */}

                      <div className="activity-type">


                        <div
                          className={`activity-icon ${activityClass}`}
                        >

                          <Icon size={17} />

                        </div>


                        <div>


                          <strong>
                            {scan.type} Scan
                          </strong>


                          <span>


                            {scan.target &&

                            scan.target.length > 55

                              ? `${scan.target.substring(
                                  0,
                                  55
                                )}...`

                              : scan.target}


                          </span>


                        </div>


                      </div>


                      {/* RESULT */}

                      <div
                        className={`activity-result ${resultClass}`}
                      >


                        {isSafe ? (

                          <CheckCircle2 size={15} />

                        ) : (

                          <AlertTriangle size={15} />

                        )}


                        {scan.prediction}


                      </div>


                      {/* CONFIDENCE */}

                      <div className="activity-confidence">


                        <strong>
                          {scan.confidence}%
                        </strong>


                        <span>
                          Confidence
                        </span>


                      </div>


                      {/* TIME */}

                      <span className="activity-time">


                        {new Date(
                          scan.timestamp
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}


                      </span>


                    </div>

                  );

                })

            )}


          </div>


        </section>


      </main>


    </div>

  );

}


export default Dashboard;