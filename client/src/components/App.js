import {useEffect, useState} from "react";
import Filters from "./Filter";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import RecipeList from './RecipeList';
import RecipeDetails from "./RecipeDetails";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";

import NewRecipe from "./NewRecipe";


function App() {
  const [recipes, setRecipes] = useState([])

  const [user, setUser] = useState(null);

  const [categoryName, setCategoryName] = useState('')
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    fetch('/recipes')
    .then(res => res.json())
    .then(prevRecipes => setRecipes(prevRecipes))
  }, [])

  // user remains logged in 
  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        });
      }
    });
  }, []);
  // console.log(user)
  
  // filter by category
  const handleCategory = (e) => {
    // console.log(e.target.value)
    setCategoryName(e.target.value);
  }
  function filterCategory() {
    // filter set to all or not filtered
    if (categoryName === 'All' || categoryName === '') {
      // doing this instead of returning recipe gives 
      // user 2 options: searched recipes or all recipes 
      return searchRecipe()
    } 
    else {
      return recipes.filter(recipe => recipe.category === categoryName)
    }
  } 

  // search recipe
  function searchRecipe() {
    if (searchText.length > 0) {
      return recipes.filter((recipe)=> 
        recipe.meal.toLowerCase().includes(searchText.toLowerCase())
      )
    } else {
      return recipes
    }
  }
  function handleSearch(input) {
    setSearchText(input)
  }

  function onAddItem(newRecipe) {
    setRecipes([...recipes, newRecipe])
    console.log(user)
  }


  function onLogout() {
    setUser(null)
    // console.log("Logout!" + user.name)
  }

  return (
    <>
      <Router>
        <NavBar user={user} onLogout ={onLogout }/>
        <Filters handleCategory={handleCategory} />
        <SearchBar searchText={searchText} handleSearch={handleSearch}/>
        {/* <Login/> */}
        <Routes>
              <Route 
                exact
                path="/new_recipe"
                element={<NewRecipe user={user} onAddItem={onAddItem}/>}
              />
              <Route
                exact
                path='/recipes/:id'
                element={<RecipeDetails/>}
              />
              {/* <Route
                exact
                path='/signup'
                element={<SignupForm user={user} setUser={setUser}/>}
              /> */}
              <Route
                exact
                path='/login'
                element={<Login user={user} setUser={setUser}/>}
              />
              
              <Route
                exact
                path="/"
                element={
                  <>
                    {/* <SearchBar searchText={searchText} handleSearch={handleSearch}/> */}
                    <RecipeList 
                    recipes={filterCategory()}
                    searchText={searchText}
                    />
                  </>}
              />
              
        </Routes>
      </Router>
    </>
  );
}

export default App;
