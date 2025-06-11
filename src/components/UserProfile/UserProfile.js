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
          <Route path="/user/overview" element={<Overview />} />
          <Route path="/user/projects" element={<Projects />} />
          <Route path="/user/comments" element={<Comments />} />
          <Route path="/user/settings" element={<Settings />} />
          <Route path="/user/delete-account" element={<DeleteAccount />} />
          <Route path="/user" element={<Navigate to="/user/overview" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserProfile;
