from urllib.parse import urlparse


TRUSTED_DOMAINS = {

    "google.com",
    "youtube.com",
    "facebook.com",
    "instagram.com",
    "whatsapp.com",
    "amazon.in",
    "amazon.com",
    "flipkart.com",
    "microsoft.com",
    "github.com",
    "linkedin.com",
    "apple.com",
    "netflix.com",
    "openai.com",
    "chatgpt.com",
    "gmail.com",
    "wikipedia.org"

}


def get_domain(url):

    domain = urlparse(
        url
    ).netloc.lower()

    if domain.startswith("www."):

        domain = domain[4:]

    return domain


def is_trusted(url):

    return (
        get_domain(url)
        in TRUSTED_DOMAINS
    )


def looks_like_trusted(url):

    domain = get_domain(url)

    fake_matches = []

    for trusted in TRUSTED_DOMAINS:

        name = trusted.split(".")[0]

        if (
            name in domain
            and domain != trusted
        ):

            fake_matches.append(
                trusted
            )

    return fake_matches