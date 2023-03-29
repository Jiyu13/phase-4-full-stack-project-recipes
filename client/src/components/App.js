import {useEffect, useState} from "react";

import NavBar from "./NavBar";
import RecipeList from './RecipeList';
import RecipeDetails from "./RecipeDetails";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Login from "./Login";

function handleLogin() {
  console.log("login!")
}

function App() {
  const [recipes, setRecipes] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/recipes')
    .then(res => res.json())
    .then(prevRecipes => setRecipes(prevRecipes))
  }, [])

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
              <Route
                exact
                path='/recipes/:id'
                element={<RecipeDetails/>}
              />
              <Route
                exact
                path='/signup'
                element={<SignupForm user={user} setUser={setUser}/>}
              />
              <Route
                exact
                path='/login'
                element={<LoginForm onLogin={handleLogin} user={user} setUser={setUser}/>}
              />
              <Route
                exact
                path="/"
                element={
                <RecipeList recipes={recipes}/>}
              />
              
        </Routes>
      </Router>
    </>
  );
}

export default App;
