from flask import Flask, render_template, request
import pickle
import json
from textblob import TextBlob

app = Flask(__name__)

# Load the trained Pipeline model
try:
    pipeline = pickle.load(open("best_nb_model_pipeline.pkl", "rb"))
except FileNotFoundError:
    pipeline = None
    print("Pipeline model not found. Ensure 'naive_bayes_pipeline.pkl' is available.")

# Landing Page Route
@app.route("/")
def landing():
    return render_template("landing.html")

# Comparison Page Route
@app.route("/comparison", methods=["GET", "POST"])
def comparison():
    try:
        with open('static/json/comparison.json') as f:
            data = json.load(f)
    except FileNotFoundError:
        data = {}  # Default empty data if the file is not found
    return render_template('comparison.html', data=data)

# Page Routes
@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/text")
def text():
    return render_template("text.html")

@app.route("/carbrand")
def car_brand():
    return render_template("carbrand.html")

@app.route("/audi")
def audi():
    return render_template("audi.html")

@app.route("/bmw")
def bmw():
    return render_template("bmw.html")

@app.route("/mercedes")
def mercedes():
    return render_template("mercedes.html")

@app.route("/lexus")
def lexus():
    return render_template("lexus.html")

@app.route("/infiniti")
def infiniti():
    return render_template("infiniti.html")

@app.route("/analysis")
def analysis():
    return render_template("analysis.html")

# Sentiment Prediction Route
@app.route("/predict", methods=["POST"])
def predict():
    review_text = request.form.get("review_text", "").strip()

    if not review_text:
        return render_template("text.html", prediction_text="Please enter a valid review.")

    if pipeline is None:
        return render_template("text.html", prediction_text="Pipeline model is not available.")

    # Predict sentiment using the pipeline model
    prediction = pipeline.predict([review_text])

    # Mapping sentiment labels
    sentiment_mapping = {-1: "Negative", 0: "Neutral", 1: "Positive"}
    predicted_sentiment = sentiment_mapping.get(prediction[0], "Unknown")

    # Compute polarity using TextBlob
    polarity = TextBlob(review_text).sentiment.polarity

    # Assign color class for visualization
    color_class = {
        "Positive": "text-green",
        "Neutral": "text-orange",
        "Negative": "text-red"
    }.get(predicted_sentiment, "text-gray")

    return render_template(
        "text.html",
        prediction_text=f"Model Prediction: {predicted_sentiment}",
        polarity_text=f"Sentiment Polarity: {polarity:.2f}",
        color_class=color_class
    )

# Run the Flask App
if __name__ == "__main__":
     app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)
