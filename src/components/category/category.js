import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import { useCategoryProjects } from "../hooks/useProjects";
import "./category.css";

const PLACEHOLDER_IMAGE = "https://placehold.co/300x200?text=No+Image";

const ProjectCard = ({ project, image, imageError, onImageError }) => (
  <div className="col-md-6 col-lg-4 col-xl-3">
    <div className="card h-100 border-0 rounded-3 overflow-hidden shadow-sm">
      <img
        src={imageError ? PLACEHOLDER_IMAGE : image || PLACEHOLDER_IMAGE}
        alt={project.title}
        onError={() => onImageError(project.id)}
        className="card-img-top object-fit-cover"
        style={{ height: "150px" }}
      />
      <div className="card-body p-3">
        <h3 className="card-title fw-bold h5">{project.title}</h3>
        <p className="card-text small">{project.details || project.description}</p>
      </div>
      <div className="card-footer bg-transparent border-0 p-3">
        <Link to={`/project/${project.id}`} className="btn donate-btn w-100 btn-sm">
          View Details
        </Link>
      </div>
    </div>
  </div>
);

function Category({ token }) {
  const { categories, loading, error } = useCategory(token);
  const {
    expandedCategory,
    projects,
    loading: projectsLoading,
    error: projectsError,
    images,
    imageErrors,
    handleImageError,
    toggleCategory,
  } = useCategoryProjects(token);

  if (loading) return <div className="text-center py-5">Loading categories...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <section className="container my-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Our Categories</h1>
        <p className="lead">
          Explore the various categories we support and find one that resonates with you. Your contribution can make a significant difference in the lives of those in need.
        </p>
      </div>

      <div className="row g-4">
        {categories.length ? (
          categories.map((category) => (
            <div key={category.id} className="col-12">
              <div className="card border-0 rounded-4 shadow-sm colorCard">
                <div className="card-body p-4">
                  <h2 className="card-title fw-bold">{category.name}</h2>
                  <p className="card-text">{category.description}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <button onClick={() => toggleCategory(category.id)} className="btn check-btn">
                      {expandedCategory === category.id ? "Hide Projects" : "View Projects"}
                    </button>
                    <Link to="/projects" className="btn check-btn">
                      View All Projects <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>

                {expandedCategory === category.id && (
                  <div className="p-4 bg-light">
                    {projectsLoading ? (
                      <div className="text-center py-3">Loading projects...</div>
                    ) : projectsError ? (
                      <div className="alert alert-danger">Error: {projectsError}</div>
                    ) : projects.length ? (
                      <div className="row g-3">
                        {projects.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            image={images[project.id]}
                            imageError={imageErrors[project.id]}
                            onImageError={handleImageError}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-3">No projects found in this category</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">No categories found</div>
        )}
      </div>
    </section>
  );
}

export default Category;
