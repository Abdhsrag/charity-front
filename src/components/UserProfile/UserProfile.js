import { Routes, Route, Navigate } from "react-router-dom";
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
