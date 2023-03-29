import RecipeCard from "./RecipeCard";

import { Link } from "react-router-dom";

function RecipeList( { recipes } ) {
    return (
        <ul className="recipes-container">
            {/* render a list of <Recipe> components in here */}
            {recipes?.map(recipe => 
                <Link className="nav-link" to={'/recipes/' + recipe.id}>
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                </Link>
            )}
        </ul>
    )

}

export default RecipeList;