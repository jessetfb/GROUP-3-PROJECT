import requests
from datetime import datetime, timedelta
from app import app
from models import db, Car, Booking, User, Review

MOCK_API_URL = 'https://64302ad0b289b1dec4c2d198.mockapi.io/adverts'

def fetch_car_images():
    response = requests.get(MOCK_API_URL)
    if response.status_code == 200:
        return response.json()
    else:
        print("Failed to fetch car images from mock API")
        return []

with app.app_context():
    print("Start seeding...")

    # Clear existing records
    Review.query.delete()
    Booking.query.delete()
    Car.query.delete()
    User.query.delete()

    print("Existing records deleted")

    # Fetch car images from mock API
    car_images = fetch_car_images()

    # Seed Users
    print("Seeding users")
    users = [
        User(username="johndoe", email="johndoe@example.com", password="password123"),
        User(username="janedoe", email="janedoe@example.com", password="password456")
    ]
    db.session.add_all(users)
    db.session.commit()
    print("Users seeded")

    # Seed Cars
    print("Seeding cars")
    cars_data = [
        {
            "name": "Tesla Model S", "description": "A fast electric car",
            "current_location": "San Francisco", "status": "Available",
            "mileage": 20000, "fuel_type": "Electric", "horse_power": 670,
            "transmission": "Automatic", "cost": 80000
        },
        {
            "name": "Toyota Corolla", "description": "A reliable compact car",
            "current_location": "New York", "status": "Available",
            "mileage": 50000, "fuel_type": "Gasoline", "horse_power": 132,
            "transmission": "Automatic", "cost": 20000
        }
    ]

    cars = []
    for i, car_data in enumerate(cars_data):
        imageURL = car_images[i].get('imageURL', 'https://example.com/default.jpg') if i < len(car_images) else 'https://example.com/default.jpg'
        car = Car(
            name=car_data["name"], imageURL=imageURL,
            description=car_data["description"], current_location=car_data["current_location"],
            status=car_data["status"], mileage=car_data["mileage"], fuel_type=car_data["fuel_type"],
            horse_power=car_data["horse_power"], transmission=car_data["transmission"],
            cost=car_data["cost"]
        )
        cars.append(car)

    db.session.add_all(cars)
    db.session.commit()
    print("Cars seeded")

    # Seed Bookings
    print("Seeding bookings")
    bookings = [
        Booking(
            user_id=users[0].id, car_id=cars[0].id, cost=80000,
            start_date=datetime.now(), end_date=datetime.now() + timedelta(days=7)
        ),
        Booking(
            user_id=users[1].id, car_id=cars[1].id, cost=20000,
            start_date=datetime.now(), end_date=datetime.now() + timedelta(days=3)
        )
    ]
    db.session.add_all(bookings)
    db.session.commit()
    print("Bookings seeded")

    # Seed Reviews
    print("Seeding reviews")
    reviews = [
        Review(
            car_id=cars[0].id, user_id=users[0].id, rating=5,
            comment="Excellent car, had a great experience!", created_at=datetime.now()
        ),
        Review(
            car_id=cars[1].id, user_id=users[1].id, rating=4,
            comment="Good car, but could be better with more features.", created_at=datetime.now()
        )
    ]
    db.session.add_all(reviews)
    db.session.commit()
    print("Reviews seeded")

    print("Database seeded")