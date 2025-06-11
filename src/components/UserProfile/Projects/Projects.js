import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Projects.css";

const Projects = () => {
  const user_id = localStorage.getItem("user_id");
  const accessToken = localStorage.getItem("accessToken");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user_id || !accessToken) {
        setError("You must be logged in to view your projects.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/project/project/user/${user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setProjects(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user_id, accessToken]);

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>

      {loading && <p>Loading projects...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && projects.length === 0 && (
        <p className="no-projects">You have no projects yet.</p>
      )}

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-details">{project.details}</p>
            <p className="project-target">Target: ${project.target}</p>
            <p className="project-start-date">
              Start Date:{" "}
              {project.S_time
                ? new Date(project.S_time).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="project-end-date">
              End Date:{" "}
              {project.E_time
                ? new Date(project.E_time).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="project-featured">
              Featured: {project.is_featured ? "Yes" : "No"}
            </p>
            <p className="project-status">
              Status:{" "}
              <span
                className={`status-badge ${
                  project.is_cancle ? "inactive" : "active"
                }`}
              >
                {project.is_cancle ? "Cancelled" : "Active"}
              </span>
            </p>
            <p className="project-rating">
              Avg Rating: {project.average_rating}
            </p>
            <p className="project-category">
              Category ID: {project.category_id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
