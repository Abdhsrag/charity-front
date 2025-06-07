import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import { useCategoryProjects } from "../hooks/useProjects";
import "./category.css";

const PLACEHOLDER_IMAGE = "https://placehold.co/300x200?text=No+Image";

function Category() {
  const { categories, loading, error } = useCategory();
  const {
    expandedCategory,
    projects,
    loading: projectsLoading,
    error: projectsError,
    images,
    imageErrors,
    handleImageError,
    toggleCategory
  } = useCategoryProjects();

  if (loading) return <div className="text-center py-5">Loading categories...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <section className="container my-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Our Categories</h1>
        <p className="lead">
          Explore the various categories we support and find one that resonates
          with you. Your contribution can make a significant difference in the
          lives of those in need.
        </p>
      </div>

      <div className="row g-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="col-12">
              <div className="card border-0 rounded-4 shadow-sm colorCard">
                <div className="card-body p-4">
                  <h2 className="card-title fw-bold">{category.name}</h2>
                  <p className="card-text">{category.description}</p>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="btn check-btn"
                  >
                    {expandedCategory === category.id
                      ? "Hide Projects"
                      : "View Projects"}
                  </button>
                </div>

                {expandedCategory === category.id && (
                  <div className="p-4 bg-light">
                    {projectsLoading ? (
                      <div className="text-center py-3">Loading projects...</div>
                    ) : projectsError ? (
                      <div className="alert alert-danger">Error: {projectsError}</div>
                    ) : projects.length > 0 ? (
                      <div className="row g-4">
                        {projects.map((project) => (
                          <div key={project.id} className="col-md-6 col-lg-4">
                            <div className="card h-100 border-0 rounded-4 overflow-hidden shadow-sm">
                              <img
                                src={
                                  imageErrors[project.id]
                                    ? PLACEHOLDER_IMAGE
                                    : images[project.id] || PLACEHOLDER_IMAGE
                                }
                                alt={project.title}
                                onError={() => handleImageError(project.id)}
                                className="card-img-top object-fit-cover"
                                style={{ height: "200px" }}
                              />
                              <div className="card-body">
                                <h3 className="card-title fw-bold">{project.title}</h3>
                                <p className="card-text">
                                  {project.details || project.description}
                                </p>
                              </div>
                              <div className="card-footer bg-transparent border-0">
                                <Link
                                  to={`/project/${project.id}`}
                                  className="btn donate-btn w-100"
                                >
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-3">
                        No projects found in this category
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            No categories found
          </div>
        )}
      </div>
    </section>
  );
}

export default Category;