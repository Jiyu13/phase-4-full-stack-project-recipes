import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

// fetch(`/recipes/${recipeID}`)
// .then(res => res.json())
// .then(prevRecipe => {
//   setTargetRecipe(prevRecipe)
//   setIsCardClick(true)}
// )

function RecipeDetails() {

    // return dynamic params from current URL that were matched by the <Route path>. 
    let { id } = useParams()

    // console.log("recipe id: "+id)
    

    const [recipe, setRecipe] = useState({})
    console.log(recipe)

    useEffect(() => {
        fetch(`/recipes/${id}`)
        .then(res => res.json())
        .then(data => setRecipe(data)     
    )
    }, [])

    return (
        <div className="recipe_details">
            <div className="recipe_title">{recipe.meal}</div>
            <div className="recipe_categorgy_tags">{recipe.category} | {recipe.tags}</div>
            <img
                src={recipe.mealThumb}
                alt={recipe.meal}
                className="recipe_card_image"
            />
            <a herf={recipe.youtube_link}>
                <img
                    src='https://www.clipartmax.com/png/middle/258-2580528_visit-our-youtube-channel-youtube-play-button-png.png'
                    alt={recipe.meal}
                />
            </a>

            <ul>
                {recipe.ingredients?.map(ingre => <li>{ingre.name} - {ingre.measure}</li>)}
            </ul>
            <hr/>
            <p>
                {recipe.instructions}
            </p>
        </div>
    )
}

export default RecipeDetails;