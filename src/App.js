import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ActivateAccount from "./components/Auth/ActivateAccount/ActivateAccount";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import Navbar from "./components/UserProfile/Navbar";
import UserProfile from "./components/UserProfile/UserProfile";
const App = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Charity App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* <Navbar /> */}
      <Switch>
        <Route path="/user" component={UserProfile} />
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/activate/:uid/:token" component={ActivateAccount} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password/:uid/:token" component={ResetPassword} />
      </Switch>
    </Router>
  );
};

export default App;
