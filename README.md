# Full Stack React/Python Application: RecipEase

This is an application for user to add and save recipes.

## Models

- A `Recipe` has many `User`s through `RecipeUser`
- A `User` has many `Recipe`s through `RecipeUser`
- A `RecipeUser` belongs to a `Recipe` and belongs to a `User`