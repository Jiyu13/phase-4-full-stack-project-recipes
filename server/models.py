from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt


# Add models here
class Ingredient(db.Model, SerializerMixin):
    __tablename__ = "ingredients"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    measure = db.Column(db.String, nullable=False)

    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    serialize_rules = ('-',)
    def __repr__(self):
        return f'''<Ingredient {self.id}: {self.name} - {self.measure}>'''


class Recipe(db.Model, SerializerMixin):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    meal = db.Column(db.String, nullable=False)
    category = db.Column(db.String)
    instructions = db.Column(db.String, nullable=False)
    mealThumb = db.Column(db.String)
    tags = db.Column(db.String)
    youtube_link = db.Column(db.String)
    source = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # one to many
    ingredients = db.relationship("Ingredient", backref='recipe')

    recipe_users = db.relationship("RecipeUser", backref="recipe")
    users = association_proxy('recipe_users', "user")

    # ADD '-ingredients.recipe'!!
    serialize_rules = ("-recipe_users.recipe", "-recipe_users.user", '-ingredients.recipe')

    def __repr__(self):
        return f"""<Recipe {self.id}; Meal: {self.meal}; Tags: {self.tags}.>"""


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    
    recipe_users = db.relationship("RecipeUser", backref="user")
    recipes = association_proxy("recipe_users", "recipe")

    serialize_rules = ("-recipe_users.recipe", "-recipe_users.user")

    # ================= incorporate bcrypt to create a secure password. ====================
    @hybrid_property
    def password_hash(self):
        # Attempts to access the password_hash should be met with an AttributeError.
        raise AttributeError("Password hashes may not be accessed")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

    def __repr__(self):
        return f"""<User {self.id}; Name: {self.name}.>"""


class RecipeUser(db.Model, SerializerMixin):
    __tablename__ = "recipe_users"

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    serialize_rules = ('-recipe.recipe_users', '-user.recipe_users')

    def __repr__(self):
        return f"""<RecipeUser {self.id}>"""
