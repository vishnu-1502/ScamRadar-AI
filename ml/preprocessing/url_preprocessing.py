import re
from urllib.parse import urlparse


# ==========================================
# URL CLEANING FUNCTION
# ==========================================

def clean_url(url):

    return str(url).strip().lower()


# ==========================================
# FEATURE EXTRACTION FUNCTION
# ==========================================

def extract_url_features(url):

    url = clean_url(url)

    parsed = urlparse(url)

    features = {

        # Basic URL features
        "url_length": len(url),

        "num_dots": url.count("."),

        "num_hyphens": url.count("-"),

        "num_slashes": url.count("/"),

        "num_digits": sum(c.isdigit() for c in url),

        # HTTPS
        "https": 1 if url.startswith("https") else 0,

        # IP address
        "has_ip": 1 if re.search(
            r"\d+\.\d+\.\d+\.\d+",
            url
        ) else 0,

        # Special characters
        "num_special_chars": sum(
            url.count(ch)
            for ch in ["@", "?", "&", "=", "%", "_"]
        ),

        # Domain length
        "domain_length": len(parsed.netloc),

        # Path length
        "path_length": len(parsed.path),

        # Number of subdomains
        "subdomains":
            parsed.netloc.count(".") - 1
            if parsed.netloc
            else 0
    }

    return features