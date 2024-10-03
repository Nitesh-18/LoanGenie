from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client.loan_db
customers = db.customers
users = db.users  # New collection for users

# JWT configuration
app.config["JWT_SECRET_KEY"] = "niteshistheplayer"  # Change this!
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


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    hashed_password = generate_password_hash(data["password"], method="sha256")
    users.insert_one({"username": data["username"], "password": hashed_password})
    return jsonify({"message": "User registered successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({"username": data["username"]})
    if user and check_password_hash(user["password"], data["password"]):
        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials"}), 401


@app.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = users.find_one({"_id": ObjectId(current_user_id)})
    return jsonify({"username": user["username"]}), 200


@app.route("/add_customer", methods=["POST"])
@jwt_required()
def add_customer():
    customer_data = request.json
    # Insert customer data into MongoDB
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


@app.route("/customer/<id>", methods=["GET"])
@jwt_required()
def get_customer(id):
    customer = customers.find_one({"_id": ObjectId(id)})
    if customer:
        customer["_id"] = str(customer["_id"])
        return jsonify(customer)
    else:
        return jsonify({"message": "Customer not found"}), 404


@app.route("/update_customer/<id>", methods=["PUT"])
@jwt_required()
def update_customer(id):
    updated_data = request.json
    result = customers.update_one({"_id": ObjectId(id)}, {"$set": updated_data})
    if result.matched_count > 0:
        return jsonify({"message": "Customer updated successfully"})
    else:
        return jsonify({"message": "Customer not found"}), 404


@app.route("/delete_customer/<id>", methods=["DELETE"])
@jwt_required()
def delete_customer(id):
    result = customers.delete_one({"_id": ObjectId(id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Customer deleted successfully"})
    else:
        return jsonify({"message": "Customer not found"}), 404


@app.route("/api/predict", methods=["POST"])
@jwt_required()
def predict():
    # This is where you can integrate your ML model for prediction
    data = request.json
    # Placeholder for model inference - replace with actual ML code
    # Use the model to predict the loan approval status based on the input
    # Return a sample result
    prediction = "Approved" if data["ApplicantIncome"] > 5000 else "Rejected"
    return jsonify({"result": prediction}), 200


if __name__ == "__main__":
    app.run(debug=True)
