import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <nav className="NavBar">
        {/* <Link to='/'>RecipEase</Link> */}
      <h1 className="logo">RecipEase</h1>
      <div className='navigate-to'>
        
            <Link to="/signup">
            <button className="NavBarButton">Sign Up</button>
            </Link>
         
            <Link to="/login">
            <button className="NavBarButton">Login</button>
            </Link>
          
            <Link to="/logout">
            <button className="NavBarButton">Logout</button>
            </Link>
          
            <Link to="/filter">
            <button className="NavBarButton">Filter</button>
            </Link>

            <Link to="/new_recipe">
            <button className="NavBarButton">New Recipe</button>
            </Link>
         
      </div>
      
    </nav>
  );
}
export default NavBar;
