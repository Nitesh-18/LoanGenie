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
from authlib.integrations.flask_client import OAuth

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

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

oauth = OAuth(app)
google = oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url="https://accounts.google.com/o/oauth2/token",
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    access_token_params=None,
    refresh_token_url=None,
    client_kwargs={"scope": "openid profile email"},
)

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
    return redirect(url_for("/", token=access_token))


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


# Prediction route (example)
@app.route("/api/predict", methods=["POST"])
@jwt_required()
def predict():
    data = request.json
    prediction = "Approved" if data["ApplicantIncome"] > 5000 else "Rejected"
    return jsonify({"result": prediction}), 200


if __name__ == "__main__":
    app.run(debug=True)
