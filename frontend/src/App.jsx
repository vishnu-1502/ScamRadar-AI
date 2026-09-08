import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import URLScanner from "./pages/URLScanner";
import SMSScanner from "./pages/SMSScanner";
import EmailScanner from "./pages/EmailScanner";
import About from "./pages/About";

function isLoggedIn() {
return !!localStorage.getItem("user");
}

function ProtectedRoute({ children }) {
if (!isLoggedIn()) {
return <Navigate to="/login" replace />;
}

return children;
}

function App() {

return ( <BrowserRouter>

```
  <Routes>

    {/* ==========================
        DEFAULT ENTRY
    ========================== */}

    <Route
      path="/"
      element={<Navigate to="/login" replace />}
    />


    {/* ==========================
        PUBLIC PAGES
    ========================== */}

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/home"
      element={<Home />}
    />

    <Route
      path="/about"
      element={<About />}
    />


    {/* ==========================
        PROTECTED PAGES
    ========================== */}

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/url-scanner"
      element={
        <ProtectedRoute>
          <URLScanner />
        </ProtectedRoute>
      }
    />

    <Route
      path="/sms-scanner"
      element={
        <ProtectedRoute>
          <SMSScanner />
        </ProtectedRoute>
      }
    />

    <Route
      path="/email-scanner"
      element={
        <ProtectedRoute>
          <EmailScanner />
        </ProtectedRoute>
      }
    />


    {/* ==========================
        FALLBACK
    ========================== */}

    <Route
      path="*"
      element={<Navigate to="/login" replace />}
    />

  </Routes>

</BrowserRouter>


);
}

export default App;
