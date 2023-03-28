from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)


# Add models here
class Ingredient(db.Model, SerializerMixin):
    __tablename__ = "ingredients"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    measure = db.Column(db.String, nullable=False)

    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"))

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
    youtubu_link = db.Column(db.String)
    source = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # one to many
    ingredients = db.relationship("Ingredient", backref='recipe')

    recipe_users = db.relationship("RecipeUser", backref="recipe")
    users = association_proxy('recipe_users', "user")

    serialize_rules = ("-recipe_users.recipes", "-recipe_users.users")

    def __repr__(self):
        return f"""<Recipe {self.id}; Meal: {self.meal}; Tags: {self.tags}.>"""


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    
    recipe_users = db.relationship("RecipeUser", backref="user")
    recipes = association_proxy("recipe_users", "recipe")

    serialize_rules = ("-recipe_users.recipes", "-recipe_users.users")

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

    def __repr__(self):
        return f"""<RecipeUser {self.id}>"""
