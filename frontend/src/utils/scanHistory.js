const API_BASE_URL = "http://127.0.0.1:5000/api";


// ==========================
// Get Current User
// ==========================

function getCurrentUser() {
  try {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  } catch (error) {
    console.error("Error reading current user:", error);
    return null;
  }
}


// ==========================
// Get Scan History
// ==========================

export async function getScanHistory() {
  try {
    const user = getCurrentUser();

    if (!user || !user.email) {
      return [];
    }

    const response = await fetch(
      `${API_BASE_URL}/history/${encodeURIComponent(user.email)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch scan history.");
    }

    const history = await response.json();

    return history;
  } catch (error) {
    console.error("Error fetching scan history:", error);
    return [];
  }
}


// ==========================
// Save Scan
// ==========================

export async function saveScan(scan) {
  try {
    const user = getCurrentUser();

    if (!user || !user.email) {
      console.error("No logged-in user found.");
      return null;
    }

    const response = await fetch(
      `${API_BASE_URL}/history/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          type: scan.type,
          target: scan.target,
          prediction: scan.prediction,
          confidence: scan.confidence,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save scan.");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error saving scan history:", error);
    return null;
  }
}


// ==========================
// Clear Scan History
// ==========================

export async function clearScanHistory() {
  console.log(
    "Clear scan history is not implemented for MongoDB yet."
  );
}


// ==========================
// Get Dashboard Statistics
// ==========================

export async function getScanStats() {
  try {
    const history = await getScanHistory();

    const totalScans = history.length;

    const safeContent = history.filter(
      (scan) =>
        scan.prediction === "HAM" ||
        scan.prediction === "BENIGN"
    ).length;

    const threatsDetected = history.filter(
      (scan) =>
        scan.prediction === "SPAM" ||
        scan.prediction === "PHISHING" ||
        scan.prediction === "MALICIOUS" ||
        scan.prediction === "DEFACEMENT"
    ).length;

    return {
      totalScans,
      safeContent,
      threatsDetected,
      lastScan:
        history.length > 0
          ? history[0].timestamp
          : null,
    };
  } catch (error) {
    console.error("Error calculating scan statistics:", error);

    return {
      totalScans: 0,
      safeContent: 0,
      threatsDetected: 0,
      lastScan: null,
    };
  }
}