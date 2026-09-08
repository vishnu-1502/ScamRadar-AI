
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

import LoginBackground from "../components/auth/LoginBackground";
import LoginIllustration from "../components/auth/LoginIllustration";
import { registerUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setRegisterError("");

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const data = await registerUser({
        name,
        email,
        password,
      });

      // Save the newly registered user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Go directly to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      setRegisterError(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
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
          {/* ===================================================== */}
          {/* LEFT SIDE */}
          {/* ===================================================== */}

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
                JOIN SCAMRADAR AI
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
                Start Your
                <br />

                <span style={{ color: "#00f58b" }}>
                  Protection.
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
                Create your account and get intelligent protection against
                suspicious URLs, SMS messages, and emails with ScamRadar AI.
              </p>
            </div>

            {/* ===================================================== */}
            {/* CYBER SECURITY ILLUSTRATION */}
            {/* ===================================================== */}

            <div
              style={{
                width: "100%",
                maxWidth: "710px",
                marginTop: "-8px",
                marginBottom: "-8px",
              }}
            >
              <LoginIllustration />
            </div>

            {/* SECURITY MESSAGE */}

            <div
              style={{
                maxWidth: "590px",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    flexShrink: 0,
                    borderRadius: "14px",
                    border: "1px solid rgba(34,197,94,0.45)",
                    background: "rgba(34,197,94,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#00f58b",
                  }}
                >
                  <Lock size={22} />
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#ffffff",
                    }}
                  >
                    Your Security Matters
                  </h3>

                  <p
                    style={{
                      margin: "5px 0 0",
                      fontSize: "13px",
                      color: "#94a3b8",
                    }}
                  >
                    Your account helps keep your digital activity protected.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================== */}
          {/* RIGHT SIDE — REGISTER FORM */}
          {/* ===================================================== */}

          <section
            style={{
              width: "580px",
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "580px",
                minHeight: "724px",
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
                  minHeight: "724px",
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
                    Create Account
                  </h2>

                  <p
                    style={{
                      margin: "12px 0 0",
                      fontSize: "14px",
                      lineHeight: "1.6",
                      color: "#94a3b8",
                    }}
                  >
                    Create your account to start using ScamRadar AI.
                  </p>
                </div>

                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  style={{
                    marginTop: "30px",
                  }}
                >
                  {/* NAME */}

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "9px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#ffffff",
                      }}
                    >
                      Full Name
                    </label>

                    <div style={{ position: "relative" }}>
                      <User
                        size={20}
                        style={{
                          position: "absolute",
                          left: "20px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#00f58b",
                        }}
                      />

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                        style={{
                          width: "100%",
                          height: "57px",
                          boxSizing: "border-box",
                          paddingLeft: "55px",
                          paddingRight: "20px",
                          borderRadius: "14px",
                          border: "1px solid #304156",
                          background: "#030a12",
                          color: "#ffffff",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "9px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#ffffff",
                      }}
                    >
                      Email Address
                    </label>

                    <div style={{ position: "relative" }}>
                      <Mail
                        size={20}
                        style={{
                          position: "absolute",
                          left: "20px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#00f58b",
                        }}
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{
                          width: "100%",
                          height: "57px",
                          boxSizing: "border-box",
                          paddingLeft: "55px",
                          paddingRight: "20px",
                          borderRadius: "14px",
                          border: "1px solid #304156",
                          background: "#030a12",
                          color: "#ffffff",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "9px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#ffffff",
                      }}
                    >
                      Password
                    </label>

                    <div style={{ position: "relative" }}>
                      <Lock
                        size={20}
                        style={{
                          position: "absolute",
                          left: "20px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#00f58b",
                        }}
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                        style={{
                          width: "100%",
                          height: "57px",
                          boxSizing: "border-box",
                          paddingLeft: "55px",
                          paddingRight: "55px",
                          borderRadius: "14px",
                          border: "1px solid #304156",
                          background: "#030a12",
                          color: "#ffffff",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((value) => !value)
                        }
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        style={{
                          position: "absolute",
                          right: "18px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          border: "none",
                          background: "transparent",
                          color: "#94a3b8",
                          padding: "4px",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CONFIRM PASSWORD */}

                  <div style={{ marginBottom: "22px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "9px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#ffffff",
                      }}
                    >
                      Confirm Password
                    </label>

                    <div style={{ position: "relative" }}>
                      <Lock
                        size={20}
                        style={{
                          position: "absolute",
                          left: "20px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#00f58b",
                        }}
                      />

                      <input
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm your password"
                        required
                        style={{
                          width: "100%",
                          height: "57px",
                          boxSizing: "border-box",
                          paddingLeft: "55px",
                          paddingRight: "55px",
                          borderRadius: "14px",
                          border: "1px solid #304156",
                          background: "#030a12",
                          color: "#ffffff",
                          fontSize: "15px",
                          outline: "none",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        style={{
                          position: "absolute",
                          right: "18px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          border: "none",
                          background: "transparent",
                          color: "#94a3b8",
                          padding: "4px",
                          cursor: "pointer",
                        }}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ERROR */}

                  {registerError && (
                    <div
                      style={{
                        marginBottom: "15px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border:
                          "1px solid rgba(248,113,113,0.3)",
                        background: "rgba(127,29,29,0.15)",
                        color: "#fca5a5",
                        fontSize: "13px",
                        textAlign: "center",
                      }}
                    >
                      {registerError}
                    </div>
                  )}

                  {/* CREATE ACCOUNT BUTTON */}

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: "100%",
                      height: "60px",
                      border: "none",
                      borderRadius: "14px",
                      background:
                        "linear-gradient(90deg, #00d96b, #00d99a)",
                      color: "#03100a",
                      fontSize: "16px",
                      fontWeight: "700",
                      cursor: isLoading
                        ? "not-allowed"
                        : "pointer",
                      opacity: isLoading ? 0.7 : 1,
                      boxShadow:
                        "0 12px 35px rgba(34,197,94,0.20)",
                    }}
                  >
                    {isLoading
                      ? "Creating Account..."
                      : "Create Account"}
                  </button>
                </form>

                {/* LOGIN LINK */}

                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "24px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#94a3b8",
                  }}
                >
                  Already have an account?

                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    style={{
                      marginLeft: "4px",
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      color: "#00f58b",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Login
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

