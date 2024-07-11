import os
from datetime import timedelta

from flask import Flask
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from models import db, User
from resources.car import CarResource
from resource.booking import BookingResource
from resources.user import SignupResource, LoginResource
from resources.review import ReviewResource


app = Flask(__name__)
api = Api(app)


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_ECHO'] = True


app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')


app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=72)

CORS(app)


migrate = Migrate(app, db, render_as_batch=True)

db.init_app(app)

bcrypt = Bcrypt(app)

jwt = JWTManager(app)



@app.route("/")
def index():
    return"<h1>group 3 projects<h1>"
api.add_resource(CarResource,'/cars','/cars/<int:id>')
api.add_resource(BookingResource,'/bookings','/bokings/<int:id>')
api.add_Resource(ReviewResource,'/reviews','/reviews/<int:id>')