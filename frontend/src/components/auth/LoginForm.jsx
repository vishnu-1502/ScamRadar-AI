import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* EMAIL */}

      <div style={{ marginBottom: "27px" }}>

        <label
          style={{
            display: "block",
            marginBottom: "11px",
            fontSize: "15px",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          Email Address
        </label>

        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >

          <Mail
            size={21}
            strokeWidth={2}
            style={{
              position: "absolute",
              left: "23px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#00f58b",
              pointerEvents: "none",
              zIndex: 2,
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
              height: "68px",
              boxSizing: "border-box",
              paddingLeft: "59px",
              paddingRight: "20px",
              borderRadius: "15px",
              border: "1px solid #304156",
              background: "#030a12",
              color: "#ffffff",
              fontSize: "16px",
              outline: "none",
            }}
          />

        </div>

      </div>


      {/* PASSWORD */}

      <div style={{ marginBottom: "4px" }}>

        <label
          style={{
            display: "block",
            marginBottom: "11px",
            fontSize: "15px",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          Password
        </label>

        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >

          <Lock
            size={21}
            strokeWidth={2}
            style={{
              position: "absolute",
              left: "23px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#00f58b",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              height: "68px",
              boxSizing: "border-box",
              paddingLeft: "59px",
              paddingRight: "59px",
              borderRadius: "15px",
              border: "1px solid #304156",
              background: "#030a12",
              color: "#ffffff",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: "20px",
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
              <EyeOff size={21} />
            ) : (
              <Eye size={21} />
            )}
          </button>

        </div>

      </div>


      {/* FORGOT PASSWORD */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "13px",
          marginBottom: "27px",
        }}
      >

        <button
          type="button"
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            color: "#00f58b",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Forgot Password?
        </button>

      </div>


      {/* LOGIN BUTTON */}

      <button
        type="submit"
        style={{
          width: "100%",
          height: "64px",
          border: "none",
          borderRadius: "14px",
          background: "linear-gradient(90deg, #00d96b, #00d99a)",
          color: "#03100a",
          fontSize: "17px",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 12px 35px rgba(34,197,94,0.20)",
        }}
      >
        Login
      </button>

    </form>
  );
}