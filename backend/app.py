from models import db, User, Car, Booking, Review
from flask_migrate import Migrate
from flask import Flask
from flask_restful import Api, Resource
import os
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from datetime import timedelta

from resources.car import CarResource
from resources.booking import BookingsResource
from resources.review import ReviewResource
from resources.user import SignupResource
from resources.user import LoginResource

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

#JWT config
app.config ["JWT_SECRET_KEY"] = "JWT_SECRET_KEY"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

migrate = Migrate(app, db, render_as_batch=True)

db.init_app(app)

api = Api(app)

bcrypt = Bcrypt(app)

CORS(app)

jwt = JWTManager(app)

class Phase4Project(Resource):
    def get(self):
        return { "message": "Hello world" }

api.add_resource(Phase4Project, '/')
api.add_resource(SignupResource, '/signup')
api.add_resource(LoginResource, '/login')
api.add_resource(CarResource, '/cars', '/cars/<int:id>')
api.add_resource(BookingsResource, '/bookings', '/bookings/<int:id>')
api.add_resource(ReviewResource, '/reviews', '/reviews/<int:id>')