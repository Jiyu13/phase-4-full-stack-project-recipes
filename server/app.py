#!/usr/bin/env python3
from flask import Flask, make_response, jsonify, request, session

from config import app, db, api 
from flask_restful import Resource
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
                tags=request.get_json()['tags'],
                youtube_link = request.get_json()['youtube_link'],
                source = request.get_json()['source'],
            )
            db.session.add(new_recipe)
            db.session.commit()

            print(request.get_json()['ingredients'])
            ingredients_lines = request.get_json()['ingredients'][0].split("\n")
            ingredients = []
            for ingredient in ingredients_lines:
                measure, name = ingredient.split("@")
                ingredients.append(Ingredient(recipe_id=new_recipe.id, name=name.strip(), measure=measure.strip()))
            db.session.bulk_save_objects(ingredients)
            db.session.commit()
            
            response = make_response(new_recipe.to_dict(), 201)
        except ValueError:
            response = make_response({'error': 'Invalid input'}, 400)
        return response

# /recipes/id
@app.route('/recipes/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def recipe_by_id(id):
    recipe = Recipe.query.filter_by(id=id).first()
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

class Signup(Resource):
    def post(self):
        # username = request.get_json()['name']
        # password = request.get_json['password']

        username = request.get_json().get('name')
        password = request.get_json().get('password')

        if username and password:
            new_user = User(name=username)

            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()

            session["user_id"] = new_user.id
            return new_user.to_dict(), 201
        return {'error': '422 Unprocessable Entity'}, 422

api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):
    def post(self):
        username = request.get_json()['name']
        password = request.get_json()['password']
        user = User.query.filter_by(name=username).first()
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
            user = User.query.filter_by(id=session['user_id']).first()
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

class Ingredients(Resource):
    def get(self):
        ingredients = Ingredient.query.all()
        ingredients_dict = [ingre.to_dict() for ingre in ingredients]
        return make_response(ingredients_dict, 200)
api.add_resource(Ingredients, '/ingredients', endpoint='ingredients')


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(port=5555, debug=True)

