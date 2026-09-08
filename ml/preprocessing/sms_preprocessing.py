import string
import nltk

from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Download NLTK resources (only the first time)
nltk.download("stopwords")

# Initialize stopwords
stop_words = set(stopwords.words("english"))

# Initialize stemmer
stemmer = PorterStemmer()


def clean_text(text):
    """
    Clean SMS text before training the machine learning model.
    """

    # Convert to lowercase
    text = text.lower()

    # Remove punctuation
    text = text.translate(str.maketrans("", "", string.punctuation))

    # Split sentence into words
    words = text.split()

    # Remove stopwords
    words = [word for word in words if word not in stop_words]

    # Apply stemming
    words = [stemmer.stem(word) for word in words]

    # Join words back into sentence
    text = " ".join(words)

    return text