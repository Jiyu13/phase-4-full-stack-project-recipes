import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import YoutubeEmbed from "./YoutubeEmbed";

function RecipeDetails() {

    const orders = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]

    // return dynamic params from current URL that were matched by the <Route path>. 
    let { id } = useParams()

    // console.log("recipe id: "+id)
    

    const [recipe, setRecipe] = useState({})
    // console.log(recipe)

    // useEffect(() => {
    //     fetch(`/recipes/${id}`)
    //     .then(res => res.json())
    //     .then(data => setRecipe(data)     
    // )
    // }, [])

    useEffect(() => {
        fetch(`/recipes/${id}`).then((r) => {
          if (r.ok) {
            r.json().then((prevRecipe) =>
              setRecipe(prevRecipe)
            );
          } else {
            window.alert('Maximum pageview limit reached')
          }
        });
    }, [id]);


    const embedId = recipe.youtube_link?.split("v=")[1]
    const instructionsText = recipe.instructions?.split(/\r?\n/)
    const tags = recipe.tags?.split(',')

    return (
        <div className="recipe_details">
            <div className="recipe_title">{recipe.meal}</div>
            <div className="recipe_categorgy_tags">{recipe.category} | {tags?.map(tag => <span> 🏷️{tag}</span> )}</div>
            
            {recipe.youtube_link ? 
                <div>
                    <YoutubeEmbed embedId={embedId}/>
                </div>
                :
                <img src={recipe.mealThumb} alt={recipe.meal} style={{width:"450px", height:"450px"}}/>
            
            }
            

            <h2>Ingredients: </h2>
            <ul>
                {recipe.ingredients?.map(ingre => 
                    
                    <li>
                        <label>
                            <input type="checkbox"/>
                            {ingre.name} - {ingre.measure}
                        </label>
                    </li>
                )}
            </ul>
            <hr/>
            <h2>Instructions:</h2>
            <ul>
                {instructionsText?.map((Instruction, index) =>
                    <li>{orders[index]}. {Instruction}</li>
                )}

            </ul>
            
        </div>
    )
}

export default RecipeDetails;