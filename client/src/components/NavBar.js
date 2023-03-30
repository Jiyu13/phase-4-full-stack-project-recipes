import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function NavBar( {user, onLogout} ) {

  function handleClick() {
    redirectHome()
  }

  let navigate = useNavigate()

  function redirectHome() {
      navigate('/')
  }

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      onLogout()
      redirectHome()
    });
  }

  return (
    <nav className="NavBar">
        {/* <Link to='/'>RecipEase</Link> */}
      <h1 className="logo" onClick={handleClick}>RecipEase</h1>
      <div className='navigate-to'>
        
            {/* <Link to="/signup">
            <button className="NavBarButton">Sign Up</button>
            </Link> */}
         
            <Link to="/login">
            <button className="NavBarButton">Login</button>
            </Link>
          
            <Link to="/logout">
            <button className="NavBarButton" onClick={handleLogout}>Logout</button>
            </Link>
          
            {/* <Link to="/filter">
            <button className="NavBarButton">Filter</button>
            </Link> */}

            <Link to="/new_recipe">
            <button className="NavBarButton">New Recipe</button>
            </Link>
         
      </div>
      
    </nav>
  );
}
export default NavBar;
