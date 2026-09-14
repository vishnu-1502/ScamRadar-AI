const API_BASE_URL =
  `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000"}/api`;

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

    return await response.json();
  } catch (error) {
    console.error("Error fetching scan history:", error);
    return [];
  }
}

export async function saveScan(scan) {
  try {
    const user = getCurrentUser();

    if (!user || !user.email) {
      console.error("No logged-in user found.");
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/history/save`, {
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
    });

    if (!response.ok) {
      throw new Error("Failed to save scan.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving scan history:", error);
    return null;
  }
}

export async function clearScanHistory() {
  console.log("Clear scan history is not implemented for MongoDB yet.");
}

export async function getScanStats() {
  try {
    const history = await getScanHistory();

    const totalScans = history.length;

    const safeContent = history.filter(
      (scan) =>
        scan.prediction === "HAM" || scan.prediction === "BENIGN"
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
      lastScan: history.length > 0 ? history[0].timestamp : null,
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