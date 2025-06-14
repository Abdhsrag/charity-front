import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import MyProject from "./myproject";
import { Link } from "react-router-dom";
import Search from "./search";

function Projects({ token }) {  
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [projectRes, imagesRes, tagsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/project/project/", { headers }),
          axios.get("http://localhost:8000/api/project-images/", { headers }),
          axios.get("http://localhost:8000/api/project-tags/", { headers }),
        ]);

        const projects = projectRes.data;
        const images = imagesRes.data;
        const tags = tagsRes.data;

        const combinedData = projects.map((project) => {
          const imageEntry = images.find((img) => img.project_id === project.id);
          const projectTags = tags
            .filter((tag) => tag.project_id === project.id)
            .map((tag) => tag.tag);

          return {
            ...project,
            logo: imageEntry?.url || "",
            tags: projectTags,
          };
        });

        setProjects(combinedData);
        setFilteredProjects(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) { 
      fetchProjects();
    }
  }, [token]); 

  return (
    <div className="container">
      <h1 className="p-4">Our Works</h1>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading projects, please wait...</p>
        </div>
      ) : (
        <>
          <Search projects={projects} setFilteredProjects={setFilteredProjects} />
          <div className="row">
            {filteredProjects.map((project) => (
              <Link
                style={{ textDecoration: "none" }}
                to={`/project/${project.id}`}
                className="col-md-3 mb-4"
                key={project.id}
              >
                <MyProject project={project} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Projects;