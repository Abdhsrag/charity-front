import React, { useEffect, useState, useCallback } from "react";
import "./home.css";
import { Link } from "react-router-dom";
// Local placeholder images or alternative service
const PLACEHOLDER_IMAGE = "https://placehold.co/600x400?text=No+Image";
const STORY_PLACEHOLDER = "https://placehold.co/300x200?text=Story";

function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [latestProjects, setLatestProjects] = useState([]);
  const [featuredImages, setFeaturedImages] = useState({});
  const [latestImages, setLatestImages] = useState({});
  const [imageErrors, setImageErrors] = useState({
    featured: {},
    latest: {},
    stories: {},
  });

  const fetchImageForProject = useCallback(async (projectId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/project/project/${projectId}/details/`
      );
      if (!res.ok) throw new Error("Failed to fetch image");
      const data = await res.json();
      return data.images && data.images.length > 0 ? data.images[0] : null;
    } catch (error) {
      console.error(`Error fetching image for project ${projectId}:`, error);
      return null;
    }
  }, []);

  const fetchFeaturedProjects = useCallback(async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/project/project/fivefeatured/"
      );
      if (!response.ok) throw new Error("Failed to fetch featured projects");
      const data = await response.json();
      const projects = data.data || data;
      setFeaturedProjects(projects);

      const imagesMap = {};
      await Promise.all(
        projects.map(async (project) => {
          imagesMap[project.id] = await fetchImageForProject(project.id);
        })
      );
      setFeaturedImages(imagesMap);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
    }
  }, [fetchImageForProject]);

  const fetchLatestProjects = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/project/project/projects_latest/"
      );
      if (!response.ok) throw new Error("Failed to fetch latest projects");
      const data = await response.json();
      const projects = data.data || data;
      setLatestProjects(projects);

      const imagesMap = {};
      await Promise.all(
        projects.map(async (project) => {
          imagesMap[project.id] = await fetchImageForProject(project.id);
        })
      );
      setLatestImages(imagesMap);
    } catch (error) {
      console.error("Error fetching latest projects:", error);
    }
  }, [fetchImageForProject]);

  useEffect(() => {
    fetchFeaturedProjects();
    fetchLatestProjects();
  }, [fetchFeaturedProjects, fetchLatestProjects]);

  const handleImageError = (type, id) => {
    setImageErrors((prev) => ({
      ...prev,
      [type]: { ...prev[type], [id]: true },
    }));
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero d-flex align-items-center">
        <div className="container text-center text-white">
          <h1>
            Empowering Communities
            <br />
            Transforming Lives
          </h1>
          <p>
            Join us in our mission to create lasting change through sustainable
            development and community empowerment.
          </p>
          <button className="btn btn-dark">Learn More</button>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="projects container my-5">
        <h2 className="mb-4">Featured Projects</h2>
        {featuredProjects.length > 0 ? (
          <div
            id="featuredCarousel"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#featuredCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    className="d-block w-100"
                    src={
                      imageErrors.featured[project.id]
                        ? PLACEHOLDER_IMAGE
                        : featuredImages[project.id] || PLACEHOLDER_IMAGE
                    }
                    alt={project.title}
                    onError={() => handleImageError("featured", project.id)}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <div className="bg-dark bg-opacity-75 rounded p-3">
                      <h5>{project.title}</h5>
                      <p>{project.details || project.description}</p>
                      <Link
                        to={`/project/${project.id}`}
                        className="btn btn-light"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#featuredCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#featuredCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading featured projects...</p>
          </div>
        )}
      </section>

      {/* Latest Projects */}
      <section className="projects container my-5">
        <h2 className="mb-4">Latest Projects</h2>
        {latestProjects.length > 0 ? (
          <div
            id="latestCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {latestProjects.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#latestCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {latestProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    className="d-block w-100"
                    src={
                      imageErrors.latest[project.id]
                        ? PLACEHOLDER_IMAGE
                        : latestImages[project.id] || PLACEHOLDER_IMAGE
                    }
                    alt={project.title}
                    onError={() => handleImageError("latest", project.id)}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <div className="bg-dark bg-opacity-75 rounded p-3">
                      <h5>{project.title}</h5>
                      <p>{project.details || project.description}</p>
                      <Link
                        to={`/project/${project.id}`}
                        className="btn btn-light"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#latestCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#latestCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading latest projects...</p>
          </div>
        )}
      </section>

      {/* Our Impact */}
      <section className="impact bg-light py-5">
        <div className="container text-center">
          <h2>Our Impact</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <h4>5,000+</h4>
              <p>Lives Transformed</p>
            </div>
            <div className="col-md-4">
              <h4>100+</h4>
              <p>Projects Completed</p>
            </div>
            <div className="col-md-4">
              <h4>1,000+</h4>
              <p>Volunteers Involved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="get-involved text-center py-5">
        <h2>Get Involved</h2>
        <p>Join our community of changemakers and make a difference.</p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link to="/volunteer" className="btn btn-primary">
            Volunteer
          </Link>
          <Link to="/donate" className="btn btn-outline-secondary">
            Donate
          </Link>
        </div>
      </section>

      {/* Stories of Change */}
      <section className="stories container my-5">
        <h2 className="mb-4">Stories of Change</h2>
        <div className="row">
          {[1, 2, 3].map((_, i) => (
            <div className="col-md-4" key={i}>
              <div className="card mb-4">
                <img
                  src={`${STORY_PLACEHOLDER}+${i + 1}`}
                  className="card-img-top"
                  alt={`Story ${i + 1}`}
                  onError={(e) => {
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">Story Title {i + 1}</h5>
                  <p className="card-text">Short description of the story...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
