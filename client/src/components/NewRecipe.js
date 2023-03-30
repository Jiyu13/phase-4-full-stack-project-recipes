import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import "./NewRecipe.css";
 

function NewRecipe({ user, onAddItem }) {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate()

    function redirectHome() {
        navigate('/')
        console.log("Reciped Added!" + user.name)
    }

  
  const initialValuesRecipe = {
    meal: "", category: "", instructions: "", mealThumb: "", tags: "", youtube_link: "", source: "",
    ingredients: ""
    // ingredient1: "", ingredient2: "", ingredient3: "", ingredient4: "", ingredient5: "",
    // ingredient6: "", ingredient7: "", ingredient8: "", ingredient9: "", ingredient10: "",
    // ingredient11: "", ingredient12: "", ingredient13: "", ingredient14: "", ingredient15: "",
    // ingredient16: "", ingredient17: "", ingredient18: "", ingredient19: "", ingredient20: "",
  }
  const [recipeData, setRecipeData] = useState(initialValuesRecipe)

  // const initialValuesIngredients ={
  //   ingredient1: "", ingredient2: "", ingredient3: "", ingredient4: "", ingredient5: "",
  //   ingredient6: "", ingredient7: "", ingredient8: "", ingredient9: "", ingredient10: "",
  //   ingredient11: "", ingredient12: "", ingredient13: "", ingredient14: "", ingredient15: "",
  //   ingredient16: "", ingredient17: "", ingredient18: "", ingredient19: "", ingredient20: "",
  // }
  // const [ingredientsData, setIngredientsData] = useState(initialValuesIngredients)

  function handleInput(e) {
    const value = e.target.value
    const name = e.target.name
    console.log(value)
    console.log(name)
    setRecipeData({...recipeData, [name]:value})
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newRecipe = {
      meal: recipeData.meal,
      category: recipeData.category,
      instructions: recipeData.instructions,
      mealThumb: recipeData.mealThumb,
      tags: recipeData.tags,
      youtube_link: recipeData.youtube_link,
      source: recipeData.source,
    }
    newRecipe.ingredients = [recipeData.ingredients]

    fetch('/recipes', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newRecipe)
    })
    .then(res => res.json())
    .then(newObj => {
      onAddItem(newObj)
      redirectHome()
    })
  }
    // newRecipe.ingredients = {
    //   ingredient1: recipeData.ingredient1, ingredient2: recipeData.ingredient2, ingredient3: recipeData.ingredient3, 
    //   ingredient4: recipeData.ingredient3, ingredient5: recipeData.ingredient5,
    //   ingredient6: recipeData.ingredient6, ingredient7: recipeData.ingredient7, ingredient8: recipeData.ingredient8, 
    //   ingredient9: recipeData.ingredient9, ingredient10: recipeData.ingredient10,
    //   ingredient11: recipeData.ingredient11, ingredient12: recipeData.ingredient12, ingredient13: recipeData.ingredient13,
    //   ingredient14: recipeData.ingredient4, ingredient15: recipeData.ingredient15,
    //   ingredient16: recipeData.ingredient16, ingredient17: recipeData.ingredient17, ingredient18: recipeData.ingredient18, 
    //   ingredient19: recipeData.ingredient19, ingredient20: recipeData.ingredient20,
    // }
  

  
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   fetch("/recipes", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title,
  //       instructions,
  //       minutes_to_complete: minutesToComplete,
  //     }),
  //   }).then((r) => {
  //     setIsLoading(false);
  //     if (r.ok) {
  //       history.push("/");
  //     } else {
  //       r.json().then((err) => setErrors(err.errors));
  //     }
  //   });
  // }

  return (
    <div className="new-recipe-form">
      <h2>Create Recipe</h2>
        <form onSubmit={handleSubmit}>            
            <input
              type="text"
              id="meal"
              name="meal"
              placeholder="Recipe title"
              value={recipeData.meal}
              onChange={handleInput}
            />

            <input
              type="text"
              id="category"
              placeholder="Category"
              value={recipeData.category}
              name="category"
              onChange={handleInput}
            />

            <textarea
              id="instructions"
              rows="10"
              placeholder="Instructions"
              value={recipeData.instructions}
              name="instructions"
              onChange={handleInput}
            />

            <input
              type="text"
              id="mealThumb"
              value={recipeData.mealThumb}
              name="mealThumb"
              placeholder="Recipe image url"
              onChange={handleInput}
            />

            <input
              id="tags"
              type="text"
              value={recipeData.tags}
              name="tags"
              placeholder="Use comma to seperate each tags"
              onChange={handleInput}
            />

            <input
              id="youtube_link"
              type="text"
              value={recipeData.youtube_link}
              name="youtube_link"
              placeholder="Youtube Link (optional)"
              onChange={handleInput}
            />

            <input
              id="source"
              type="text"
              value={recipeData.source}
              name="source"
              placeholder="Source (optional)"
              onChange={handleInput}
            />

            <textarea
              id="ingredients"
              type="text"
              name="ingredients"
              value={recipeData.ingredients}
              placeholder="Ingredients: e.g. 175g @ flour"
              onChange={handleInput}
            />

            <button color="primary" type="submit">
              Add
            </button>

        </form>
    </div>
  );
}


export default NewRecipe