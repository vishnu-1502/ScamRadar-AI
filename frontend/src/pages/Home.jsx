import {
  ShieldCheck,
  Shield,
  Sparkles,
  ArrowRight,
  Link2,
  MessageSquareText,
  Mail,
  Zap,
  LockKeyhole,
  Target,
  CheckCircle2,
} from "lucide-react";
import "../App.css";

function Home() {
  return (
    <div className="home-page">
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={22} />
          </div>

          <span>
            Scam<span className="brand-highlight">Radar</span>{" "}
            <span className="brand-ai">AI</span>
          </span>
        </div>

        <div className="nav-links">
          <a href="/" className="active">
            Home
          </a>

          <a href="/dashboard">Dashboard</a>

          <a href="/about">About</a>
        </div>

        <a href="/dashboard" className="nav-button">
          Get Started
          <ArrowRight size={16} />
        </a>
      </nav>

      {/* ================= HERO ================= */}
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="security-badge">
              <Sparkles size={14} />
              AI POWERED SECURITY
            </div>

            <h1>
              Detect <span className="blue-text">Scams.</span>
              <br />
              Stay <span className="green-text">Safe.</span>
            </h1>

            <p className="hero-description">
              AI-powered detection for URLs, SMS, and Emails to protect you
              from online threats.
            </p>

            <div className="hero-buttons">
              <a href="/dashboard" className="primary-button">
                Try Now
                <ArrowRight size={18} />
              </a>

              <a href="/about" className="secondary-button">
                Learn More
              </a>
            </div>

            {/* Mini Detection Features */}
            <div className="mini-features">
              <div className="mini-feature">
                <CheckCircle2 size={17} />
                <span>Real-time Detection</span>
              </div>

              <div className="mini-feature">
                <CheckCircle2 size={17} />
                <span>AI Powered</span>
              </div>

              <div className="mini-feature">
                <CheckCircle2 size={17} />
                <span>Privacy Focused</span>
              </div>
            </div>
          </div>

          {/* ================= SHIELD VISUAL ================= */}
          <div className="hero-visual">
            <div className="shield-glow"></div>

            <div className="circuit circuit-one"></div>
            <div className="circuit circuit-two"></div>
            <div className="circuit circuit-three"></div>
            <div className="circuit circuit-four"></div>

            <div className="shield-container">
              <Shield size={170} strokeWidth={1.2} />

              <div className="shield-lock">
                <LockKeyhole size={55} strokeWidth={1.5} />
              </div>
            </div>

            <div className="floating-card floating-card-one">
              <CheckCircle2 size={18} />
              <div>
                <strong>Protected</strong>
                <span>AI Security Active</span>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <Target size={18} />
              <div>
                <strong>99.7%</strong>
                <span>Detection Accuracy</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATISTICS ================= */}
        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-value blue-text">99.7%</div>
            <div className="stat-label">Detection Accuracy</div>
          </div>

          <div className="stat-card">
            <div className="stat-value cyan-text">3+</div>
            <div className="stat-label">Detection Engines</div>
          </div>

          <div className="stat-card">
            <div className="stat-value purple-text">24/7</div>
            <div className="stat-label">Always Protecting</div>
          </div>
        </section>

        {/* ================= DETECTION ENGINES ================= */}
        <section className="engines-section">
          <div className="section-heading">
            <div className="section-badge">OUR DETECTION ENGINES</div>

            <h2>
              One platform.
              <span className="blue-text"> Three layers of protection.</span>
            </h2>

            <p>
              Scan suspicious content using specialized AI-powered detection
              engines.
            </p>
          </div>

          <div className="engine-grid">
            {/* URL */}
            <div className="engine-card url-engine">
              <div className="engine-icon">
                <Link2 size={27} />
              </div>

              <h3>URL Detection</h3>

              <p>
                Detect malicious and phishing websites before you click them.
              </p>

              <div className="engine-footer">
                <span>AI Model</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* SMS */}
            <div className="engine-card sms-engine">
              <div className="engine-icon">
                <MessageSquareText size={27} />
              </div>

              <h3>SMS Spam Detection</h3>

              <p>
                Identify spam, fraudulent messages, and suspicious links.
              </p>

              <div className="engine-footer">
                <span>NLP Model</span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* EMAIL */}
            <div className="engine-card email-engine">
              <div className="engine-icon">
                <Mail size={27} />
              </div>

              <h3>Email Spam Detection</h3>

              <p>
                Analyze email content and detect potential spam and threats.
              </p>

              <div className="engine-footer">
                <span>Content Analysis</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </section>

        {/* ================= BOTTOM FEATURES ================= */}
        <section className="feature-strip">
          <div className="strip-item">
            <ShieldCheck size={22} />
            <span>AI Powered</span>
          </div>

          <div className="strip-item">
            <Zap size={22} />
            <span>Real-time Detection</span>
          </div>

          <div className="strip-item">
            <LockKeyhole size={22} />
            <span>Privacy Focused</span>
          </div>

          <div className="strip-item">
            <Target size={22} />
            <span>High Accuracy</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;