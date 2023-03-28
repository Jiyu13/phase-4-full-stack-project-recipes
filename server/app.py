#!/usr/bin/env python3
from flask import Flask, make_response, jsonify, request, session

from config import app, db, api, Resource
from models import Recipe, User, Ingredient, RecipeUser

# /recipies
@app.route('/recipes', methods=['GET', 'POST'])
def recipes():
    recipes = Recipe.query.all()
    if request.method == 'GET':
        return make_response([recipe.to_dict() for recipe in recipes], 200)
    elif request.method == 'POST':
        try:
            new_recipe = Recipe(
                meal = request.get_json()['meal'],
                category = request.get_json()['category'],
                instructions = request.get_json()['instructions'],
                mealThumb = request.get_json()['mealThumb'],
                youtube_link = request.get_json()['youtube_link'],
                source = request.get_json()['source'],
            )
            db.session.add(new_recipe)
            db.session.commit()
        except ValueError:
            return make_response({'error': 'Invalid input'}, 400)

# /recipes/id
@app.route('/recipes/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def recipe_by_id(id):
    recipe = Recipe.query.filter_id(id=id).first()
    if not recipe:
        return make_response('Recipe not found!', 404)
    elif request.method == 'GET':
        return make_response(recipe.to_dict(), 200)
    elif request.method == 'PATCH':
        try:
            for attr in request.get_json():
                setattr(recipe, attr, request.get_json()[attr])
            db.session.add(recipe)
            db.session.commit()
            return make_response(recipe.to_dict(), 200)
        except ValueError:
            return make_response({'error': 'Invalid input'}, 400)
    elif request.method == 'DELETE':
        db.session.delete(recipe)
        db.session.commit()
        return make_response('', 200)

# POST /recipe_users ???

# class Signup(Resource):
#     def post(self):
#         pass
# api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):
    def post(self):
        password = request.get_json()['password']
        user = User.query.filter_by(name=request.get_json()['name']).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return make_response(user.to_dict())
        return make_response({'message': '401: Not Authorized'}, 401)
api.add_resource(Login, '/login', endpoint='login')

class CheckSession(Resource):
    def get(self):
        # if the user is logged in (if their user_id is in the session object):
        if session.get('user_id'):
            user = User.query.filter_by(name=request.get_json()['name']).first()
            return make_response(user.to_dict(), 200)
        return make_response({'message': '401: Not Authorized'}, 401)
    
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Logout(Resource):
    def delete(self):
        # if the user is logged in 
        if session.get('user_id'):
            # Remove the user's ID from the session object.
            session['user_id'] = None
            return make_response({'message':'204: No Content'}, 204)
        return make_response({'error': '401: Unauthorized'}, 401)
    
api.add_resource(Logout, '/logout', endpoint='logout')

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(port=5555, debug=True)

