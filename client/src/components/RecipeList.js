import RecipeCard from "./RecipeCard";

import { Link } from "react-router-dom";

function RecipeList( { recipes, handleClick} ) {
    
    

    return (
        <ul className="recipes-container">
            {/* render a list of <Recipe> components in here */}
            {recipes?.map(recipe => 
                // <Link to={'/recipes/'+ recipe.id} >
                <Link to={`/recipes/${recipe.id}`} >
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
                    {/* <RecipeCard key={recipe.id} recipe={recipe}/> */}
                </Link>
            )}
        </ul>
    )

}

export default RecipeList;