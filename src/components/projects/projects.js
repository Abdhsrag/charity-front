import React, { useState } from "react";
import MyProject from "./myproject";
import { Link } from "react-router-dom";
import Search from "./search";
import { useProjects, useProjectImages } from "../../components/hooks/useProjects";

function Projects({ token }) {
  const { projects, loading, error } = useProjects("/", token);
  const [filteredProjects, setFilteredProjects] = useState([]);

  React.useEffect(() => {
    setFilteredProjects(projects.filter(project => !project.is_cancle));
  }, [projects]);

  const { images, imageErrors, handleImageError } = useProjectImages(filteredProjects, token);

  if (error) {
    console.error("Error fetching projects:", error);
  }

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
            {filteredProjects.map((project) => {
              const projectWithImage = {
                ...project,
                logo: images[project.id] || null,
                tags: [],
              };
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/project/${project.id}`}
                  className="col-md-3 mb-4"
                  key={project.id}
                >
                  <MyProject project={projectWithImage} />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Projects;
