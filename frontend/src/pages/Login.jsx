import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginBackground from "../components/auth/LoginBackground";
import LoginIllustration from "../components/auth/LoginIllustration";
import LoginForm from "../components/auth/LoginForm";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import { loginUser } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setLoginError("");
    setIsLoading(true);

    try {
      const data = await loginUser(credentials);

      console.log("Login successful:", data);

      // Save logged-in user information
      localStorage.setItem("user", JSON.stringify(data.user));

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <LoginBackground>

      <main
        style={{
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "40px",
            paddingLeft: "66px",
            paddingRight: "66px",
            paddingTop: "32px",
            paddingBottom: "32px",
            boxSizing: "border-box",
          }}
        >

          {/* LEFT */}

          <section
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >

            {/* BRAND */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "30px",
              }}
            >

              <div
                style={{
                  width: "54px",
                  height: "54px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  border: "1px solid rgba(34,197,94,0.6)",
                  background: "rgba(34,197,94,0.06)",
                }}
              >
                <span
                  style={{
                    fontSize: "29px",
                    fontWeight: "700",
                    color: "#00f58b",
                  }}
                >
                  S
                </span>
              </div>

              <div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: "23px",
                    lineHeight: "1",
                    fontWeight: "700",
                    color: "#ffffff",
                  }}
                >
                  ScamRadar AI
                </h2>

                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "13px",
                    color: "#94a3b8",
                  }}
                >
                  Intelligent Scam Detection
                </p>

              </div>

            </div>


            {/* HERO TEXT */}

            <div
              style={{
                maxWidth: "590px",
              }}
            >

              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "0.30em",
                  color: "#00f58b",
                }}
              >
                AI-POWERED PROTECTION
              </p>

              <h1
                style={{
                  margin: 0,
                  fontSize: "58px",
                  lineHeight: "0.98",
                  fontWeight: "800",
                  letterSpacing: "-0.035em",
                  color: "#ffffff",
                }}
              >
                Detect Scams.
                <br />

                <span style={{ color: "#00f58b" }}>
                  Stay Safe.
                </span>
              </h1>

              <p
                style={{
                  margin: "21px 0 0",
                  maxWidth: "545px",
                  fontSize: "15px",
                  lineHeight: "1.85",
                  color: "#cbd5e1",
                }}
              >
                ScamRadar AI uses intelligent machine learning technology to
                analyze suspicious URLs, SMS messages, and emails before they
                can put you at risk.
              </p>

            </div>


            {/* ILLUSTRATION */}

            <div
              style={{
                width: "100%",
                maxWidth: "710px",
                marginTop: "4px",
              }}
            >
              <LoginIllustration />
            </div>


            {/* FEATURE CARDS */}

            <div
              style={{
                width: "100%",
                maxWidth: "710px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "13px",
              }}
            >

              <FeatureCard
                type="bot"
                title="AI Powered"
                description="Intelligent scam analysis"
              />

              <FeatureCard
                type="bolt"
                title="Real-Time"
                description="Instant threat detection"
              />

              <FeatureCard
                type="lock"
                title="Secure"
                description="Your safety comes first"
              />

            </div>

          </section>


          {/* RIGHT */}

          <section
            style={{
              width: "580px",
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >

            {/* LOGIN CARD */}

            <div
              style={{
                position: "relative",
                width: "580px",
                height: "724px",
                boxSizing: "border-box",
                borderRadius: "23px",
                border: "1px solid rgba(71,85,105,0.9)",
                background: "rgba(7,17,28,0.96)",
                boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
                overflow: "hidden",
              }}
            >

              {/* GREEN GLOW */}

              <div
                style={{
                  position: "absolute",
                  top: "-110px",
                  right: "-100px",
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.12)",
                  filter: "blur(85px)",
                  pointerEvents: "none",
                }}
              />

              {/* TOP GREEN LINE */}

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "58%",
                  height: "1px",
                  background:
                    "linear-gradient(to left, rgba(74,222,128,0.55), transparent)",
                }}
              />


              {/* CARD CONTENT */}

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: "100%",
                  boxSizing: "border-box",
                  padding: "43px 43px 31px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >

                {/* HEADER */}

                <div>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "34px",
                      lineHeight: "1.15",
                      fontWeight: "700",
                      letterSpacing: "-0.025em",
                      color: "#ffffff",
                    }}
                  >
                    Welcome Back!
                  </h2>

                  <p
                    style={{
                      margin: "12px 0 0",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      color: "#94a3b8",
                    }}
                  >
                    Login to continue protecting yourself with ScamRadar AI.
                  </p>

                </div>


                {/* FORM */}

                <div
                  style={{
                    marginTop: "34px",
                  }}
                >
                  <LoginForm onSubmit={handleLogin} />
                </div>


                {/* ERROR MESSAGE */}

                {loginError && (
                  <div
                    style={{
                      marginTop: "12px",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      border: "1px solid rgba(248,113,113,0.3)",
                      background: "rgba(127,29,29,0.15)",
                      color: "#fca5a5",
                      fontSize: "13px",
                      textAlign: "center",
                    }}
                  >
                    {loginError}
                  </div>
                )}


                {/* LOADING MESSAGE */}

                {isLoading && (
                  <p
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      fontSize: "13px",
                      color: "#00f58b",
                    }}
                  >
                    Signing you in...
                  </p>
                )}


                {/* DIVIDER */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginTop: "23px",
                    marginBottom: "23px",
                  }}
                >

                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "#263445",
                    }}
                  />

                  <span
                    style={{
                      fontSize: "13px",
                      color: "#94a3b8",
                    }}
                  >
                    or
                  </span>

                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      background: "#263445",
                    }}
                  />

                </div>


                {/* GOOGLE */}

                <GoogleLoginButton onClick={handleGoogleLogin} />


                {/* BOTTOM */}

                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "25px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#94a3b8",
                  }}
                >

                  Don't have an account?

                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    style={{
                      marginLeft: "3px",
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      color: "#00f58b",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Create Account
                  </button>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </LoginBackground>
  );
}


/* ===================================================== */
/* FEATURE CARD */
/* ===================================================== */

function FeatureCard({ type, title, description }) {
  return (
    <div
      style={{
        minHeight: "94px",
        display: "flex",
        alignItems: "center",
        gap: "11px",
        padding: "12px 15px",
        boxSizing: "border-box",
        borderRadius: "15px",
        border: "1px solid #1e3042",
        background: "rgba(7,17,28,0.82)",
      }}
    >

      <div
        style={{
          width: "42px",
          height: "42px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#00f58b",
        }}
      >

        {type === "bot" && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            style={{ width: "32px", height: "32px" }}
          >
            <rect x="4" y="6" width="16" height="13" rx="3" />
            <path d="M8 10h.01M16 10h.01" />
            <path d="M9 15h6" />
            <path d="M12 3v3" />
            <path d="M8 19v2M16 19v2" />
            <path d="M4 11H2M22 11h-2" />
          </svg>
        )}

        {type === "bolt" && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            style={{ width: "36px", height: "36px" }}
          >
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
          </svg>
        )}

        {type === "lock" && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            style={{ width: "32px", height: "32px" }}
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <path d="M12 14v3" />
          </svg>
        )}

      </div>

      <div>

        <h3
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: "700",
            color: "#00f58b",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "12px",
            lineHeight: "1.4",
            color: "#94a3b8",
          }}
        >
          {description}
        </p>

      </div>

    </div>
  );
}