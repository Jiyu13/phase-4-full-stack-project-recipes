import {useEffect, useState} from "react";
import Filters from "./Filter";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import RecipeList from './RecipeList';
import RecipeDetails from "./RecipeDetails";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function App() {
  const [recipes, setRecipes] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [searchText, setSearchText] = useState('');


  useEffect(() => {
    fetch('/recipes')
    .then(res => res.json())
    .then(prevRecipes => setRecipes(prevRecipes))
  }, [])
  // console.log(recipes)

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

  return (
    <>
      <Router>
        <NavBar />
        <Filters handleCategory={handleCategory} />
        <Routes>
              <Route
                exact
                path='/recipes/:id'
                element={<RecipeDetails/>}
              />
              <Route
                exact
                path="/"
                element={
                  <>
                    <SearchBar searchText={searchText} handleSearch={handleSearch}/>
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
