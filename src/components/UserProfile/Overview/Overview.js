// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Overview.css";

// const Overview = () => {
//   const [projectsCount, setProjectsCount] = useState(0);
//   const [commentsCount, setCommentsCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const user_id = localStorage.getItem("user_id");
//   const accessToken = localStorage.getItem("accessToken");

//   useEffect(() => {
//     const fetchOverview = async () => {
//       if (!user_id || !accessToken) {
//         setError("You must be logged in to view your overview.");
//         return;
//       }

//       setLoading(true);
//       setError("");

//       try {
//         // Fetch projects
//         const projectsResponse = await axios.get(
//           `http://127.0.0.1:8000/api/project/project/user/${user_id}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         setProjectsCount(projectsResponse.data.length);

//         // Fetch comments
//         const commentsResponse = await axios.get(
//           `http://127.0.0.1:8000/api/comments/by-user/${user_id}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         setCommentsCount(commentsResponse.data.length);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load overview data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOverview();
//   }, [user_id, accessToken]);

//   return (
//     <div className="overview-container">
//       <h2 className="overview-title">Dashboard Overview</h2>

//       {loading && <p>Loading data...</p>}
//       {error && <div className="alert alert-danger">{error}</div>}

//       {!loading && !error && (
//         <div className="overview-cards">
//           <div className="overview-card">
//             <h3 className="card-title">Welcome, User #{user_id}</h3>
//             <p>Here is your quick dashboard summary.</p>
//           </div>

//           <div className="overview-card stats-card">
//             <h4>Projects</h4>
//             <p className="stats-number">{projectsCount}</p>
//           </div>

//           <div className="overview-card stats-card">
//             <h4>Comments</h4>
//             <p className="stats-number">{commentsCount}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Overview;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/auth/useAuth";
import "./Overview.css";
import { useFetchUserProfile } from "../../hooks/auth/useFetchUserProfile";
const Overview = () => {
  const navigate = useNavigate();
  const { token, user_id, email, role } = useAuth();

  const [projectsCount, setProjectsCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const firstName = localStorage.getItem("first_name") || "";
  const lastName = localStorage.getItem("last_name") || "";
  const userName = `${firstName} ${lastName}`.trim() || "User";
  useFetchUserProfile(token, user_id);
  useEffect(() => {
    const fetchOverview = async () => {
      if (!user_id || !token) {
        setError("You must be logged in to view your overview.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        // Projects
        const projectsResponse = await axios.get(
          `http://127.0.0.1:8000/api/project/project/user/${user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectsCount(projectsResponse.data.length);

        // Comments
        const commentsResponse = await axios.get(
          `http://127.0.0.1:8000/api/comments/by-user/${user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCommentsCount(commentsResponse.data.length);
      } catch (err) {
        console.error(err);
        setError("Failed to load overview data.");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [user_id, token]);

  const goToProjects = () => navigate("/user/projects");
  const goToComments = () => navigate("/user/comments");

  return (
    <div className="overview-container">
      <h2 className="overview-title">Dashboard Overview</h2>

      {loading && <p>Loading data...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="overview-cards">
          <div className="overview-card">
            <h3 className="card-title">Welcome, {userName}</h3>
            <p>Here is your quick dashboard summary.</p>
          </div>

          <div
            className="overview-card stats-card clickable"
            onClick={goToProjects}
          >
            <h4>Projects</h4>
            <p className="stats-number">{projectsCount}</p>
          </div>

          <div
            className="overview-card stats-card clickable"
            onClick={goToComments}
          >
            <h4>Comments</h4>
            <p className="stats-number">{commentsCount}</p>
          </div>

          <div className="overview-card stats-card">
            <h4>Your Role</h4>
            <p className="stats-number">{role}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
