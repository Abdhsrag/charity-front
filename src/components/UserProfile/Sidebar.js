// src/components/UserProfile/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <nav className="sidebar-nav">
        <NavLink
          exact
          to="/user/overview"
          className="sidebar-link"
          activeClassName="active"
        >
          Overview
        </NavLink>
        <NavLink
          to="/user/projects"
          className="sidebar-link"
          activeClassName="active"
        >
          Projects
        </NavLink>
        <NavLink
          to="/user/comments"
          className="sidebar-link"
          activeClassName="active"
        >
          Comments
        </NavLink>
        <NavLink
          to="/user/settings"
          className="sidebar-link"
          activeClassName="active"
        >
          Settings
        </NavLink>
        <NavLink
          to="/user/delete-account"
          activeClassName="active-link"
          className="sidebar-link delete-link"
        >
          Delete Account
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
