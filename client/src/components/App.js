import {useEffect, useState} from "react";

import NavBar from "./NavBar";
import RecipeList from './RecipeList';
import Recipe from "./Recipe";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

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
      <Router>
        <NavBar/>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RecipeList recipes={recipes}/>
            }
          />
          <Route
            exact
            path="/recipes/:id"
            element={<Recipe/>}
          />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
