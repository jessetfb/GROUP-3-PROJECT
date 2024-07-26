from flask_restful import Resource, reqparse
from flask import request, make_response, jsonify
from sqlalchemy import func
from datetime import datetime
from models import db, Booking, Car

parser = reqparse.RequestParser()
parser.add_argument('user_id', type=int, required=True, help='User ID is required')
parser.add_argument('car_id', type=int, required=True, help='Car ID is required')
parser.add_argument('cost', type=int, required=True, help='Cost is required')
parser.add_argument('start_date', type=str, required=True, help='Start date is required (ISO format)')
parser.add_argument('end_date', type=str, required=True, help='End date is required (ISO format)')

class BookingsResource(Resource):
    def get(self, id=None):
        if id:
            booking = Booking.query.filter_by(id=id).first()
            
            if booking:
                return booking.to_dict(), 200
            else:
                return {"message": "Booking not found"}, 404
        else:
            bookings = [n.to_dict() for n in Booking.query.all()]
            response = make_response(jsonify(bookings), 200)
            return response
        
    def delete(self, id):
        booking = Booking.query.get_or_404(id)
        db.session.delete(booking)
        db.session.commit()
        return jsonify({'message': 'Booking deleted'})

    def put(self, id):
        booking = Booking.query.get_or_404(id)
        args = parser.parse_args()
        
        booking.user_id = args['user_id']
        booking.car_id = args['car_id']
        booking.cost = args['cost']
        booking.start_date = datetime.fromisoformat(args['start_date'])
        booking.end_date = datetime.fromisoformat(args['end_date'])
        
        db.session.commit()
        return jsonify({'message': 'Booking updated'})
    def post(self):
        args = parser.parse_args()
        
        # Check if the car exists
        car = Car.query.get(args['car_id'])
        if not car:
            return {"message": "Car not found"}, 404

        # Check if the car is already booked for the given dates
        overlapping_bookings = Booking.query.filter(
            Booking.car_id == args['car_id'],
            Booking.start_date < datetime.fromisoformat(args['end_date']),
            Booking.end_date > datetime.fromisoformat(args['start_date'])
        ).first()

        if overlapping_bookings:
            return {"message": "Car is not available for the selected dates"}, 400

        new_booking = Booking(
            user_id=args['user_id'],
            car_id=args['car_id'],
            cost=args['cost'],
            start_date=datetime.fromisoformat(args['start_date']),
            end_date=datetime.fromisoformat(args['end_date'])
        )
        
        db.session.add(new_booking)
        db.session.commit()
        
        return {"message": "Booking created successfully", "booking_id": new_booking.id}, 201