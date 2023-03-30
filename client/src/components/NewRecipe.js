import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import "./NewRecipe.css";
 

function NewRecipe({ user }) {
  // const [title, setTitle] = useState("My Awesome Recipe");
  // const [minutesToComplete, setMinutesToComplete] = useState("30");
  // const [instructions, setInstructions] = useState(`Here's how you make it.
    
  // ## Ingredients

  // - 1c Sugar
  // - 1c Spice

  // ## Instructions

  // **Mix** sugar and spice. _Bake_ for 30 minutes.
  //   `);


  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const initialValuesRecipe = {
    meal: "", category: "", instructions: "", mealThumb: "", tags: "", youtube_link: "", source: "",
    ingredient1: "", ingredient2: "", ingredient3: "", ingredient4: "", ingredient5: "",
    ingredient6: "", ingredient7: "", ingredient8: "", ingredient9: "", ingredient10: "",
    ingredient11: "", ingredient12: "", ingredient13: "", ingredient14: "", ingredient15: "",
    ingredient16: "", ingredient17: "", ingredient18: "", ingredient19: "", ingredient20: "",
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
    const value = e.targe.value
    const name = e.targe.name
    setRecipeData({...recipeData, [name]:value})
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newRecipe = {
      
    }
  }

  let navigate = useNavigate()

  function redirectHome() {
      navigate('/')
  }

  

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
        <form>

            {/* <label htmlFor="meal">Title</label> */}
            
            <input
              type="text"
              id="meal"
              value="{meal}"
              onChange={handleInput}
            />

            {/* <label htmlFor="category">Category</label> */}
            <input
              type="text"
              id="category"
              value="{category}"
              onChange={handleInput}
            />

            {/* <label htmlFor="instructions">Instructions</label> */}
            <textarea
              id="instructions"
              rows="10"
              value="{instructions}"
              onChange={handleInput}
            />

            {/* <label htmlFor="mealThumb">Tags</label> */}
            <input
              type="text"
              id="mealThumb"
              value="{mealThumb}"
              placeholder="Recipe image url"
              onChange={handleInput}
            />

            {/* <label htmlFor="tags">Tags</label> */}
            <input
              id="tags"
              type="text"
              value="{tags}"
              placeholder="Use comma to seperate each tags"
              onChange={handleInput}
            />

            {/* <label htmlFor="youtube_link">Youtube Link</label> */}
            <input
              id="youtube_link"
              type="text"
              value="{youtube_link}"
              placeholder="optional"
              onChange={handleInput}
            />

            {/* <label htmlFor="source">Source</label> */}
            <input
              id="source"
              type="text"
              value="{source}"
              placeholder="optional"
              onChange={handleInput}
            />

            {/* <p>Ingredients</p> */}
            {/* <label htmlFor="ingredient1">Ingredients</label> */}
            <input
              id="ingredient1"
              type="text"
              value="{ingredient1}"
              placeholder="optional"
              onChange={handleInput}
            />

            <button color="primary" type="submit">
              {/* {isLoading ? "Loading..." : "Submit Recipe"} */}
              Add
            </button>
            {/* {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))} */}
        </form>

        {/* <h1>{title}</h1>
        <p>
          <em>Time to Complete: {minutesToComplete} minutes</em>
          &nbsp;·&nbsp;
          <cite>By {user.username}</cite>
        </p>
        <ReactMarkdown>{instructions}</ReactMarkdown> */}
    </div>
  );
}


export default NewRecipe