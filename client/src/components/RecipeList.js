import RecipeCard from "./RecipeCard";

function RecipeList( { recipes } ) {
    return (
        <ul className="recipes-container">
            {/* render a list of <Recipe> components in here */}
            {recipes?.map(recipe => 
                <RecipeCard key={recipe.id} recipe={recipe}/>
                // console.log(recipe)
            )}
        </ul>
    )

}

export default RecipeList;