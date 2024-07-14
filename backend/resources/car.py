from flask_restful import Resource, reqparse
from flask import Flask, jsonify, request, make_response
from sqlalchemy import and_, not_

from models import db, Car

#authorization
@app.before_request
def check_if_logged_in():
    if not session ['user_id']\
        and request.endpoint != 'car_list' :
        return {'error': 'Unauthorized'}, 401
    
class CarResource(Resource):
    def get(self, id=None):
        if id:
            car = Car.query.filter_by(id=id).first()
            
            if car:
                return car.to_dict(), 200
            else:
                return {"message": "Car not found"}, 404
        else:
            cars = [n.to_dict() for n in Car.query.all()]
            response = make_response(jsonify(cars), 200)
            return response
    def post(self):
       data = request.get_json() 
       
       new_car = Car(
           name = data['name'],
           description = data ['description'],
           current_location = data['current_location'],
           status = data['status'],
           mileage = data['mileage'],
           fuel_type = data['fuel_type'],
           horse_power = data['horse_power'],
           transmission= data['transmission'],
           cost = data['cost']
       )
       
       db.session.add(new_car)
       db.session.commit()
       
       return {"message": "Car created successfully"}
       