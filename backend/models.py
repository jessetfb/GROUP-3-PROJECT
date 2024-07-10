from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

#model
class Car(db.Model, SerializerMixin):
    __tablename__ = 'cars'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.Text)
    current_location = db.Column(db.String)
    status = db.Column(db.String)
    mileage = db.Column(db.Integer)
    fuel_type = db.Column(db.String)
    horse_power = db.Column(db.Integer)
    transmission = db.Column(db.String)

    bookings = db.relationship('Booking', back_populates ='car')

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'booking'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)

    user = db.relationship('User', back_populates ='bookings')
    car = db.relationship('Car', back_populates = 'bookings')

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String)

    serialize_rules = ('-password',)