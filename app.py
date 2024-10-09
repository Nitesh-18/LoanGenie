from flask import Flask, jsonify, request, redirect, url_for
from pymongo import MongoClient
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from dotenv import load_dotenv
import os
import joblib
import pandas as pd
from flask_cors import CORS


# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# Load the trained model and encoded column names
model = joblib.load("models/loan_approval_model.pkl")
encoded_columns = joblib.load("models/encoded_columns.pkl")  # Add this line

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client.loan_db
customers = db.customers
users = db.users  # New collection for users

# JWT configuration - loaded from .env
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# Google OAuth configuration
app.config["GOOGLE_CLIENT_ID"] = os.getenv("GOOGLE_CLIENT_ID")
app.config["GOOGLE_CLIENT_SECRET"] = os.getenv("GOOGLE_CLIENT_SECRET")
app.config["SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# JWT setup
jwt = JWTManager(app)

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)


class User(UserMixin):
    def __init__(self, id):
        self.id = id


@login_manager.user_loader
def load_user(user_id):
    user = users.find_one({"_id": ObjectId(user_id)})
    if user:
        return User(user_id)
    return None


# Google OAuth login route
@app.route("/login")
def login():
    redirect_uri = url_for("authorize", _external=True)
    return google.authorize_redirect(redirect_uri)


@app.route("/authorize")
def authorize():
    token = google.authorize_access_token()
    user_info = google.parse_id_token(token)

    user = users.find_one({"email": user_info["email"]})

    # If the user does not exist, create a new user
    if not user:
        new_user = {
            "username": user_info["name"],
            "email": user_info["email"],
            "profile_pic": user_info["picture"],
        }
        users.insert_one(new_user)
        user = new_user

    login_user(User(str(user["_id"])))
    access_token = create_access_token(identity=str(user["_id"]))

    # Redirect to home page after successful login
    return redirect(url_for("home", token=access_token))


# Home route (example)
@app.route("/")
@jwt_required()
def home():
    current_user_id = get_jwt_identity()
    user = users.find_one({"_id": ObjectId(current_user_id)})
    return (
        jsonify(
            {
                "message": "Welcome to LoanGenie",
                "username": user["username"],
                "email": user["email"],
            }
        ),
        200,
    )


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return jsonify({"message": "User logged out successfully"}), 200


# Other routes like customer management, etc.
@app.route("/add_customer", methods=["POST"])
@jwt_required()
def add_customer():
    customer_data = request.json
    customers.insert_one(customer_data)
    return jsonify({"message": "Customer added successfully"}), 201


@app.route("/customers", methods=["GET"])
@jwt_required()
def get_customers():
    customer_list = []
    for customer in customers.find():
        customer["_id"] = str(
            customer["_id"]
        )  # Convert ObjectId to string for JSON serialization
        customer_list.append(customer)
    return jsonify(customer_list)


# Prediction route
@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.json

    # Prepare the data for prediction
    input_data = {
        "ApplicantIncome": data["ApplicantIncome"],
        "CoapplicantIncome": data["CoapplicantIncome"],
        "LoanAmount": data["LoanAmount"],
        "Loan_Amount_Term": data["Loan_Amount_Term"],
        "Credit_History": data["Credit_History"],
        "Gender": data["Gender"],
        "Married": data["Married"],
        "Dependents": data["Dependents"],
        "Education": data["Education"],
        "Self_Employed": data["Self_Employed"],
        "Property_Area": data["Property_Area"],
    }

    # Convert input_data into a DataFrame
    input_df = pd.DataFrame([input_data])

    # Specify the order of columns (match the model's input_columns)
    input_columns = [
        "ApplicantIncome",
        "CoapplicantIncome",
        "LoanAmount",
        "Loan_Amount_Term",
        "Credit_History",
        "Gender",
        "Married",
        "Dependents",
        "Education",
        "Self_Employed",
        "Property_Area",
    ]

    input_df = input_df[input_columns]

    # Load the encoded columns used during training
    encoded_columns = joblib.load("models/encoded_columns.pkl")

    # One-hot encode categorical features
    input_df_encoded = pd.get_dummies(input_df, drop_first=True)

    # Ensure the input_df_encoded has the same columns as the model's training data
    for col in encoded_columns:
        if col not in input_df_encoded.columns:
            input_df_encoded[col] = 0  # Add missing columns with default 0 values

    # Reorder columns to match the training set
    input_df_encoded = input_df_encoded[encoded_columns]

    # Print debug information about the input
    print("Encoded Input DataFrame:")
    print(input_df_encoded.head())  # Debug print to check encoded input

    # Make prediction using the loaded model
    prediction = model.predict(input_df_encoded)
    print(prediction)

    # Return the prediction result
    result = (
        "Approved" if prediction[0] == 'Y' else "Rejected"
    )  # Adjust based on your target encoding
    return jsonify({"result": result}), 200


if __name__ == "__main__":
    app.run(debug=True)
