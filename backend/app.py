from models import db, User, Car, Booking, Review
from flask_migrate import Migrate
from flask import Flask, jsonify, request
from flask_restful import Api
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token

from resources.car import CarResource
from resources.booking import BookingsResource
from resources.review import ReviewResource

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

# Setup CORS
CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
jwt = JWTManager(app)

@app.route("/")
def index():
    return "<h1>Phase 4 project</h1>"

@app.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

@jwt_required()
@app.route("/protected", methods=["GET"])
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

api.add_resource(CarResource, '/cars', '/cars/<int:id>')
api.add_resource(BookingsResource, '/bookings', '/bookings/<int:id>')
api.add_resource(ReviewResource, '/reviews', '/reviews/<int:id>')

if __name__ == "__main__":
    app.run(debug=True)
