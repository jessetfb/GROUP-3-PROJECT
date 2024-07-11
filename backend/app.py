from models import db, User, Car, Booking, Review
from flask_migrate import Migrate
from flask import Flask
from flask_restful import Api
import os

from resources.car import CarResource
from resources.booking import BookingsResource
from resources.review import ReviewResource

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


@app.route("/")
def index():
    return "<h1>Phase 4 project</h1>"

api.add_resource(CarResource, '/cars', '/cars/<int:id>')
api.add_resource(BookingsResource, '/bookings', '/bookings/<int:id>')
api.add_resource(ReviewResource, '/reviews', '/reviews/<int:id>')