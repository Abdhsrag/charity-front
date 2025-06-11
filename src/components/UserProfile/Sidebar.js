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
          to="/user/overview"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/user/projects"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/user/comments"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Comments
        </NavLink>
        <NavLink
          to="/user/settings"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Settings
        </NavLink>
        <NavLink
          to="/user/delete-account"
          className={({ isActive }) =>
            isActive
              ? "sidebar-link delete-link active-link"
              : "sidebar-link delete-link"
          }
        >
          Delete Account
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
