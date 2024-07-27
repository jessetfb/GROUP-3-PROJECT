import requests
from datetime import datetime, timedelta
from app import app
from models import db, Car, Booking, User, Review

BASE_URL = "http://127.0.0.1:5000/cars"

def fetch_car_images():
    response = requests.get(BASE_URL)
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
        {"name": "Tesla Model S", "description": "A fast electric car", "current_location": "San Francisco", "status": "Available", "mileage": 20000, "fuel_type": "Electric", "horse_power": 670, "transmission": "Automatic", "cost": 80000, "imageURL":
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_v_I4SzmXLU09kHt0gKR8fhhT_WL3cNLsmA&s"},
        {"name": "Toyota Corolla", "description": "A reliable compact car", "current_location": "New York", "status": "Available", "mileage": 50000, "fuel_type": "Gasoline", "horse_power": 132, "transmission": "Automatic", "cost": 20000, "imageURL": 
         "https://media.ed.edmunds-media.com/toyota/corolla/2023/oem/2023_toyota_corolla_sedan_xse_fq_oem_1_1280.jpg"},
        {"name": "Honda Civic", "description": "A fuel-efficient sedan", "current_location": "Los Angeles", "status": "Available", "mileage": 30000, "fuel_type": "Gasoline", "horse_power": 158, "transmission": "Manual", "cost": 22000, "imageURL":
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCO3boZ2JczIXcOdlyzrp28XrHUXS086ptjw&s"},
        {"name": "Ford Mustang", "description": "A classic American muscle car", "current_location": "Miami", "status": "Available", "mileage": 15000, "fuel_type": "Gasoline", "horse_power": 450, "transmission": "Automatic", "cost": 35000, "imageURL":
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWB1YNdqEj9jTTGOwuHFpY8GUCZHcvnq1RgA&s"},
        {"name": "Chevrolet Camaro", "description": "A stylish sports car", "current_location": "Chicago", "status": "Available", "mileage": 10000, "fuel_type": "Gasoline", "horse_power": 275, "transmission": "Automatic", "cost": 30000, "imageURL": 
         "https://cdn.jdpower.com/JDPA_2020%20Chevrolet%20Camaro%20LT1%20Satin%20Steel%20Front%20Quarter%20View.jpg"},
        {"name": "BMW 3 Series", "description": "A luxury compact car", "current_location": "Seattle", "status": "Available", "mileage": 25000, "fuel_type": "Gasoline", "horse_power": 320, "transmission": "Automatic", "cost": 40000, "imageURL": 
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0PFUP7vOM9M5FkNGadEu1aV2_m5fLc0fyg&s"},
        {"name": "Audi A4", "description": "A premium sedan with advanced features", "current_location": "San Diego", "status": "Available", "mileage": 18000, "fuel_type": "Gasoline", "horse_power": 190, "transmission": "Automatic", "cost": 38000, "imageURL":
          "https://imgd.aeplcdn.com/664x374/n/cw/ec/51909/a4-exterior-left-rear-three-quarter.jpeg?q=80"},
        {"name": "Mercedes-Benz C-Class", "description": "A luxury car with refined style", "current_location": "Boston", "status": "Available", "mileage": 22000, "fuel_type": "Gasoline", "horse_power": 255, "transmission": "Automatic", "cost": 42000, "imageURL": 
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FByddYneZoh5lSWTNI3dti6g26pL59MyJg&s"},
        {"name": "Hyundai Sonata", "description": "A well-rounded midsize sedan", "current_location": "Dallas", "status": "Available", "mileage": 35000, "fuel_type": "Gasoline", "horse_power": 190, "transmission": "Automatic", "cost": 25000, "imageURL":
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5Rb_FGdLwxQkfG3qe6Q4gcjsOJUAeJlTgQ&s"},
        {"name": "Nissan Altima", "description": "A comfortable and practical car", "current_location": "Denver", "status": "Available", "mileage": 27000, "fuel_type": "Gasoline", "horse_power": 182, "transmission": "Automatic", "cost": 23000, "imageURL": 
         "https://www.motortrend.com/uploads/2023/08/2024-Nissan-Altima-2.5SL-AWD-001-Front-three-quarter.jpg"},
        {"name": "Kia Optima", "description": "A stylish and efficient sedan", "current_location": "Philadelphia", "status": "Available", "mileage": 31000, "fuel_type": "Gasoline", "horse_power": 245, "transmission": "Automatic", "cost": 24000, "imageURL": 
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWVOtes4GGOCwwBGcPW72vI90qSdjNmyIkd82tjC9pCC5b8Etq8_c1EBS2dbRK6_SDyEQ&usqp=CAU"},
        {"name": "Subaru Impreza", "description": "A versatile and rugged compact car", "current_location": "Phoenix", "status": "Available", "mileage": 32000, "fuel_type": "Gasoline", "horse_power": 152, "transmission": "Automatic", "cost": 22000, "imageURL":
          "https://hips.hearstapps.com/hmg-prod/images/2024-subaru-imprezars102-64258a8412f3b.jpg?crop=0.514xw:0.578xh;0.399xw,0.295xh&resize=768:*"},
        {"name": "Volkswagen Jetta", "description": "A sporty and practical compact car", "current_location": "Las Vegas", "status": "Available", "mileage": 28000, "fuel_type": "Gasoline", "horse_power": 147, "transmission": "Automatic", "cost": 21000, "imageURL":
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGo-reROdigAXhgP7taNSCr2K-nICcyY_wog&s"},
        {"name": "Mazda3", "description": "A compact car with engaging handling", "current_location": "Atlanta", "status": "Available", "mileage": 26000, "fuel_type": "Gasoline", "horse_power": 186, "transmission": "Automatic", "cost": 23000, "imageURL":
          "https://mazda-brochures.com/main/mazda3/2023/1/en-ee/assets/images/mobile/Nagisa-mazda3-hatchback-parked-next-to-brick-building-mob.jpg"},
        {"name": "Porsche 911", "description": "A high-performance sports car", "current_location": "Orlando", "status": "Available", "mileage": 12000, "fuel_type": "Gasoline", "horse_power": 443, "transmission": "Automatic", "cost": 90000, "imageURL":
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-w1kI1utt_WKdr0yE8rWcaXMUbGtKD-A0w&s"}
    ]

    cars = []
    for i, car_data in enumerate(cars_data):
        imageURL = car_images[i].get('imageURL', '') if i < len(car_images) else ''
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