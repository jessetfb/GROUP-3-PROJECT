from flask_restful import Resource, reqparse
from flask import jsonify, request, make_response

from models import db, Review

class ReviewResource(Resource):
    def get(self, id=None):
        if id:
            review = Review.query.filter_by(id=id).first()
            
            if review:
                return review.to_dict(), 200
            else:
                return {"message": "Review not found"}, 404
        else:
            reviews = [n.to_dict() for n in Review.query.all()]
            response = make_response(jsonify(reviews), 200)
            return response
        
    def post(self):
        data = request.get_json()
        
        try:
            new_review = Review(
                user_id=data['user_id'],
                car_id=data['car_id'],
                rating=data['rating'],
                comment=data.get('comment')  
            )
            db.session.add(new_review)
            db.session.commit()
            
            return {"message": "Review created successfully"}, 201
        
        except Exception as e:
            db.session.rollback()
            return {"message": f"An error occurred: {str(e)}"}, 500