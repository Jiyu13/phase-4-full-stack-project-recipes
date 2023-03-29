import {useEffect, useState} from "react";

function Recipe( {recipe} ) {



    const [id, meal, category, instructions, mealThumb, tags, youtube_link, source] = recipe


    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        fetch('/ingredients')
        .then(res => res.json())
        .then(prevIngredients => setIngredients(prevIngredients))
    }, [])
    // console.log(ingredients)

    const ingredientsList = ingredients?.filter(ingre => ingre.id === id)

    return (
        <div className="recipe_details">
            <div className="recipe_title">{meal}</div>
            <div className="recipe_categorgy_tags">{category} | {tags}</div>
            <img
                    src={mealThumb}
                    alt={meal}
                    className="recipe_card_image"
            />
            <img><a herf={youtube_link}>:yt:</a></img>
            <p>
                {instructions}
            </p>

            <ul>
                {ingredientsList?.map(ingre => <li>{ingre}</li>)}
            </ul>
        </div>
    )
}

export default Recipe;