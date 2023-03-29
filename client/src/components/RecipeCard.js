function RecipeCard( {recipe} ) {
    return (
        <li className="recipe_card" value={recipe.id}>
            <img
                src={recipe.mealThumb}
                alt={recipe.meal}
                className="recipe_card_image"
            />
            <div className="recipe_card_title">
                {recipe.meal}
            </div>
        </li>
    )
}

export default RecipeCard;