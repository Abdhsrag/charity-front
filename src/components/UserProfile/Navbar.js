// src/components/Navbar/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Charity App
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/projects" className="navbar-link">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/comments" className="navbar-link">
              Comments
            </Link>
          </li>
          <li>
            <Link to="/settings" className="navbar-link">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link navbar-link-auth">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="navbar-link navbar-link-auth">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
