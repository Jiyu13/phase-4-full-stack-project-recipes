import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <nav className="NavBar">
      <div className="">
        <Link to='/'>RecipEase</Link>
      </div>
      <ul>
        <li>
          <Link to="/">
            <button className="NavBarButton">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/login">
          <button className="NavBarButton">Login</button>
          </Link>
        </li>
        <li>
          <Link to="/logout">
          <button className="NavBarButton">Logout</button>
          </Link>
        </li>
        <li>
          <Link to="/filter">
          <button className="NavBarButton">Filter</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;
