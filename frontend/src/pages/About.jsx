import {
  ShieldCheck,
  Link2,
  MessageSquareText,
  Mail,
  ArrowRight,
  BrainCircuit,
  Zap,
  Lock,
  SearchCheck,
  CheckCircle2,
  Activity,
} from "lucide-react";

function About() {
  return (
    <div className="about-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="brand">

          <div className="brand-icon">
            <ShieldCheck size={22} />
          </div>

          <span>
            Scam
            <span className="brand-highlight">Radar</span>{" "}
            <span className="brand-ai">AI</span>
          </span>

        </div>

        <div className="nav-links">

          <a href="/">Home</a>

          <a href="/dashboard">
            Dashboard
          </a>

          <a href="/about" className="active">
            About
          </a>

        </div>

        <a href="/dashboard" className="nav-button">
          Get Started
          <ArrowRight size={16} />
        </a>

      </nav>


      {/* ================= MAIN CONTAINER ================= */}

      <main className="about-container">


        {/* ================= HERO ================= */}

        <section className="about-hero">

          <div className="about-badge">
            <ShieldCheck size={14} />
            ABOUT SCAMRADAR AI
          </div>

          <h1>
            Smarter Detection.
            <br />
            <span className="about-green">
              Safer Digital Experiences.
            </span>
          </h1>

          <p>
            ScamRadar AI is an intelligent cybersecurity platform designed
            to analyze suspicious URLs, SMS messages, and emails using
            machine learning and security rule analysis.
          </p>

        </section>


        {/* ================= PLATFORM ================= */}

        <section className="about-platform">

          <div className="about-section-header">

            <span>THE PLATFORM</span>

            <h2>
              What is ScamRadar AI?
            </h2>

            <p>
              A unified security platform for detecting suspicious
              digital content before it becomes a threat.
            </p>

          </div>


          <div className="about-platform-card">

            <div className="about-platform-icon">
              <BrainCircuit size={27} />
            </div>

            <div>

              <h3>
                Intelligent Threat Analysis
              </h3>

              <p>
                ScamRadar AI combines machine learning models with
                security-focused rule analysis to identify suspicious
                patterns in digital content. Instead of relying on a
                single detection technique, the platform combines
                multiple indicators to provide a clearer security verdict.
              </p>

            </div>

          </div>

        </section>


        {/* ================= DETECTION ENGINES ================= */}

        <section className="about-engines">

          <div className="about-section-header">

            <span>THREE DETECTION ENGINES</span>

            <h2>
              One Platform. Multiple Layers of Protection.
            </h2>

            <p>
              ScamRadar AI provides specialized scanners for the most
              common channels used by online scams.
            </p>

          </div>


          <div className="about-engine-grid">


            {/* ================= URL ================= */}

            <div className="about-engine-card url-about-card">

              <div className="about-engine-top">

                <div className="about-engine-icon">
                  <Link2 size={26} />
                </div>

                <span className="about-engine-number">
                  01
                </span>

              </div>

              <h3>
                URL Scanner
              </h3>

              <p>
                Analyzes websites and links for phishing,
                malicious domains, suspicious activity,
                and website defacement.
              </p>

              <div className="about-engine-footer">
                PHISHING DETECTION
              </div>

            </div>


            {/* ================= SMS ================= */}

            <div className="about-engine-card sms-about-card">

              <div className="about-engine-top">

                <div className="about-engine-icon">
                  <MessageSquareText size={26} />
                </div>

                <span className="about-engine-number">
                  02
                </span>

              </div>

              <h3>
                SMS Scanner
              </h3>

              <p>
                Analyzes text messages for spam patterns,
                suspicious keywords, malicious links,
                and common scam indicators.
              </p>

              <div className="about-engine-footer">
                SPAM DETECTION
              </div>

            </div>


            {/* ================= EMAIL ================= */}

            <div className="about-engine-card email-about-card">

              <div className="about-engine-top">

                <div className="about-engine-icon">
                  <Mail size={26} />
                </div>

                <span className="about-engine-number">
                  03
                </span>

              </div>

              <h3>
                Email Scanner
              </h3>

              <p>
                Analyzes email content for spam, phishing
                attempts, suspicious links, and
                security-related keywords.
              </p>

              <div className="about-engine-footer">
                EMAIL ANALYSIS
              </div>

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section className="about-how">

          <div className="about-section-header">

            <span>HOW IT WORKS</span>

            <h2>
              From Input to Security Verdict
            </h2>

            <p>
              ScamRadar AI follows a simple multi-stage analysis
              process to identify potential threats.
            </p>

          </div>


          <div className="about-process">


            {/* ================= STEP 01 ================= */}

            <div className="about-process-card">

              <div className="about-process-top">

                <div className="about-process-number">
                  01
                </div>

                <div className="about-process-icon">
                  <SearchCheck size={21} />
                </div>

              </div>

              <h3>
                Submit Content
              </h3>

              <p>
                Enter a URL, SMS message, or email that you
                want to investigate.
              </p>

              <span className="about-process-label">
                INPUT
              </span>

            </div>


            {/* ================= STEP 02 ================= */}

            <div className="about-process-card">

              <div className="about-process-top">

                <div className="about-process-number">
                  02
                </div>

                <div className="about-process-icon">
                  <BrainCircuit size={21} />
                </div>

              </div>

              <h3>
                AI Analysis
              </h3>

              <p>
                The content is processed using the appropriate
                machine learning detection engine.
              </p>

              <span className="about-process-label">
                MACHINE LEARNING
              </span>

            </div>


            {/* ================= STEP 03 ================= */}

            <div className="about-process-card">

              <div className="about-process-top">

                <div className="about-process-number">
                  03
                </div>

                <div className="about-process-icon">
                  <Lock size={21} />
                </div>

              </div>

              <h3>
                Security Rules
              </h3>

              <p>
                Additional security indicators and suspicious
                patterns are analyzed to strengthen the detection.
              </p>

              <span className="about-process-label">
                RULE ANALYSIS
              </span>

            </div>


            {/* ================= STEP 04 ================= */}

            <div className="about-process-card">

              <div className="about-process-top">

                <div className="about-process-number">
                  04
                </div>

                <div className="about-process-icon">
                  <CheckCircle2 size={21} />
                </div>

              </div>

              <h3>
                Security Verdict
              </h3>

              <p>
                The system returns a prediction, confidence
                score, and reasons behind the result.
              </p>

              <span className="about-process-label">
                FINAL RESULT
              </span>

            </div>


          </div>

        </section>


        {/* ================= KEY FEATURES ================= */}

        <section className="about-features">

          <div className="about-section-header">

            <span>KEY FEATURES</span>

            <h2>
              Built for Practical Security Analysis
            </h2>

            <p>
              Designed to make suspicious-content detection
              simple, fast, and understandable.
            </p>

          </div>


          <div className="about-feature-grid">


            <div className="about-feature-card">

              <div className="about-feature-icon">
                <BrainCircuit size={21} />
              </div>

              <h3>
                Machine Learning
              </h3>

              <p>
                Uses trained machine learning models to
                identify suspicious digital content.
              </p>

            </div>


            <div className="about-feature-card">

              <div className="about-feature-icon">
                <Activity size={21} />
              </div>

              <h3>
                Confidence Scoring
              </h3>

              <p>
                Provides a confidence percentage along with
                every security prediction.
              </p>

            </div>


            <div className="about-feature-card">

              <div className="about-feature-icon">
                <SearchCheck size={21} />
              </div>

              <h3>
                Explainable Results
              </h3>

              <p>
                Shows reasons and suspicious indicators
                behind each detection result.
              </p>

            </div>


            <div className="about-feature-card">

              <div className="about-feature-icon">
                <Zap size={21} />
              </div>

              <h3>
                Real-Time Analysis
              </h3>

              <p>
                Quickly analyzes submitted content and
                provides results through the security dashboard.
              </p>

            </div>


            <div className="about-feature-card">

              <div className="about-feature-icon">
                <ShieldCheck size={21} />
              </div>

              <h3>
                Multi-Layer Protection
              </h3>

              <p>
                Combines machine learning with security
                rules for stronger threat detection.
              </p>

            </div>


            <div className="about-feature-card">

              <div className="about-feature-icon">
                <Lock size={21} />
              </div>

              <h3>
                Secure Analysis
              </h3>

              <p>
                Content is analyzed through the ScamRadar AI
                detection system before displaying the result.
              </p>

            </div>


          </div>

        </section>


        {/* ================= TECHNOLOGY ================= */}

        <section className="about-technology">

          <div className="about-section-header">

            <span>TECHNOLOGY</span>

            <h2>
              Powered by Modern Technologies
            </h2>

            <p>
              ScamRadar AI combines web technologies,
              machine learning, and backend APIs.
            </p>

          </div>


          <div className="about-tech">

            <div className="about-tech-item">
              React
            </div>

            <div className="about-tech-item">
              JavaScript
            </div>

            <div className="about-tech-item">
              Flask
            </div>

            <div className="about-tech-item">
              Python
            </div>

            <div className="about-tech-item">
              Machine Learning
            </div>

            <div className="about-tech-item">
              Scikit-learn
            </div>

            <div className="about-tech-item">
              MongoDB
            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="about-cta">

          <div className="about-cta-icon">
            <ShieldCheck size={27} />
          </div>

          <h2>
            Check Before You Trust.
          </h2>

          <p>
            Use ScamRadar AI to analyze suspicious URLs,
            SMS messages, and emails before interacting with them.
          </p>

          <a
            href="/dashboard"
            className="about-cta-button"
          >
            Open Security Dashboard
            <ArrowRight size={16} />
          </a>

        </section>


      </main>

    </div>
  );
}

export default About;