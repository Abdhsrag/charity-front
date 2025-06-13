import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Overview from "./Overview/Overview";
import Projects from "./Projects/Projects";
import Comments from "./Comments/Comments";
import Settings from "./Settings/Settings";
import DeleteAccount from "./DeleteAccount/DeleteAccount";

import "./UserProfile.css";

const UserProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="userprofile-container">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hamburger-btn"
      >
        ☰
      </button>

      <Sidebar isOpen={sidebarOpen} />

      <div
        className="userprofile-content"
        onClick={() => setSidebarOpen(false)} // auto-close sidebar on content click
      >
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="projects" element={<Projects />} />
          <Route path="comments" element={<Comments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="delete-account" element={<DeleteAccount />} />
          <Route path="" element={<Navigate to="overview" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserProfile;
