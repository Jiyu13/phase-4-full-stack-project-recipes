import {useEffect, useState} from "react";
import RecipeList from './RecipeList';

function App() {

  
  const [recipes, setRecipes] = useState([])
  

  useEffect(() => {
    fetch('/recipes')
    .then(res => res.json())
    .then(prevRecipes => setRecipes(prevRecipes))
  }, [])
  // console.log(recipes)

  return (
    <>
      {/* <Home/> */}
      <RecipeList recipes={recipes}/>

    </>
  );
}

export default App;
