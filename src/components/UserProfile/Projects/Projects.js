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
            <p className="project-description">{project.description}</p>
            <p className="project-date">
              Created: {new Date(project.created_at).toLocaleDateString()}
            </p>
            <p className="project-status">
              Status:{" "}
              <span
                className={`status-badge ${
                  project.status === "active" ? "active" : "inactive"
                }`}
              >
                {project.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
