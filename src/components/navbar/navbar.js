// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
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
              <Link className="nav-link custom-nav-link" to="/contactus">Contact</Link>
            </li>
            
            {/* Show Donate button for all users */}
            <li className="nav-item mx-2">
              <Link className="btn donate-btn" to="/donate">Donate</Link>
            </li>
            
            {/* Conditional rendering based on login status */}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="btn login-btn" to="/login">Login</Link>
              </li>
            )}
            
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <button
                    className="btn login-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link custom-nav-link" to="/user">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;