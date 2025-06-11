// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar  () {
    return(
  <nav className="navbar navbar-expand-lg custom-navbar">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Chariytable
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/projects">Projects</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link custom-nav-link" to="/contact">Contact</Link>
          </li>
          <li className="nav-item mx-2">
            <Link className="btn donate-btn" to="/donate">Donate</Link>
          </li>
          <li className="nav-item">
            <Link className="btn login-btn" to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    );
}

export default Navbar;
