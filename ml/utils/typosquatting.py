from urllib.parse import urlparse

trusted_domains = [
    "google.com",
    "github.com",
    "amazon.com",
    "paypal.com",
    "facebook.com",
    "instagram.com",
    "microsoft.com",
    "apple.com",
    "netflix.com",
    "flipkart.com",
    "linkedin.com",
    "openai.com"
]


def is_typosquatting(url):

    try:
        domain = urlparse(url).netloc.lower()

        if domain.startswith("www."):
            domain = domain[4:]

        for trusted in trusted_domains:

            name = trusted.replace(".com", "")

            if name in domain and domain != trusted:
                return trusted

        return None

    except:
        return None