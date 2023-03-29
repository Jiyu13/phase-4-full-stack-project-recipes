function RecipeCard( {recipe} ) {

    // console.log(recipe)

    // const [id, meal, category, instructions, mealThumb, tags, youtube_link, source] = recipe

    
    return (
        <li className="recipe_card" value={recipe.meal}>
            <div>
                <img
                    src={recipe.mealThumb}
                    alt={recipe.meal}
                    className="recipe_card_image"
                />
                <div className="recipe_card_title">
                    {recipe.meal}
                </div>
                

            </div>

        </li>
    )
}

export default RecipeCard;