// src/components/UserProfile/UserProfile.js
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./Sidebar";
import Overview from "./Overview/Overview";
import Projects from "./Projects/Projects";
import Comments from "./Comments/Comments";
import Settings from "./Settings/Settings";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

import "./UserProfile.css";

const UserProfile = () => {
  return (
    <div className="userprofile-container">
      <Sidebar />
      <div className="userprofile-content">
        <Switch>
          <Route path="/user/overview" component={Overview} />
          <Route path="/user/projects" component={Projects} />
          <Route path="/user/comments" component={Comments} />
          <Route path="/user/settings" component={Settings} />
          <Route path="/user/delete-account" component={DeleteAccount} />
          <Redirect exact from="/user" to="/user/overview" />
        </Switch>
      </div>
    </div>
  );
};

export default UserProfile;
