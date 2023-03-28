from random import choice as rc, randint

from faker import Faker
from app import app
from models import db, Recipe, User, RecipeUser 

import json
import requests

fake = Faker()
def make_recipes():
    Recipe.query.delete()

    recipes = []
    for i in range(52764, 52795):
        api = f"https://www.themealdb.com/api/json/v1/1/lookup.php?i={i}"
        response = requests.get(api)
        data = response.text
        data_json = json.loads(data)
        recipe_data = data_json['meals'][0]
        recipe = Recipe(
            meal = recipe_data['strMeal'],
            category = recipe_data['strCategory'],
            instructions = recipe_data['strInstructions'],
            # ingredients = recipe_data['strIngredient1'],
            mealThumb = recipe_data['strMealThumb'],
            tags = recipe_data['strTags'],
            youtube_link = recipe_data['strYouTube'],
            source = recipe_data['strSource'],
        )
        recipes.append(recipe)

    db.session.add_all(recipes)
    db.session.commit()

def make_users():
    User.query.delete()

    users = []
    for i in range(3):
        user = User(
            name=fake.name(),
        )
        user.password_hash = user.name + 'password'
        users.append(user)

    db.session.add_all(users)
    db.session.commit()

def make_recipe_users():

    RecipeUser.query.delete()
    recipes = Recipe.query.with_entities(Recipe.id).all()
    users = User.query.with_entities(User.id).all()

    recipe_users = []

    for i in range(20):
        recipe_user = RecipeUser(
            # set attribute for recipe_user
            user_id = rc(users)[0],
            recipe_id = rc(recipes)[0]
        )
        recipe_users.append(recipe_user)

    db.session.add_all(recipe_users)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        make_recipes()
        make_users()
        make_recipe_users()
    
