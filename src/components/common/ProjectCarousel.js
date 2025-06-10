import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "./loading";

const PLACEHOLDER_IMAGE = "https://placehold.co/300x200?text=No+Image";

const ProjectCarousel = ({
  projects,
  images,
  imageErrors,
  onImageError,
  carouselId,
  fadeEffect = false,
}) => {
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 576) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 992) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  if (projects.length === 0) {
    return <Loading message="Loading projects..." />;
  }

  const slides = [];
  for (let i = 0; i < projects.length; i += itemsPerSlide) {
    slides.push(projects.slice(i, i + itemsPerSlide));
  }

  return (
    <div
      id={carouselId}
      className={`carousel slide ${fadeEffect ? "carousel-fade" : ""}`}
      data-bs-ride="carousel"
      style={{ maxHeight: "350px" }}
    >
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="row g-3 px-4">
              {slide.map((project) => (
                <div key={project.id} className={`col-${12 / itemsPerSlide}`}>
                  <div className="card h-100">
                    <img
                      className="card-img-top"
                      src={
                        imageErrors[project.id]
                          ? PLACEHOLDER_IMAGE
                          : images[project.id] || PLACEHOLDER_IMAGE
                      }
                      alt={project.title}
                      onError={() => onImageError(project.id)}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{project.title}</h6>
                      <p className="card-text small text-muted flex-grow-1">
                        {project.details || project.description}
                      </p>
                      <Link
                        to={`/project/${project.id}`}
                        className="btn btn-sm mt-auto"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
      >
        <span aria-hidden="true">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#95c3e6" 
          >
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
          </svg>
        </span>{" "}
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span aria-hidden="true">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="#95c3e6" 
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </span>{" "}
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ProjectCarousel;
