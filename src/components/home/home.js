import "./home.css";
import { useProjects, useProjectImages } from "../hooks/useProjects";
import useCategory from "../hooks/useCategory";
import HeroSection from "../common/hero";
import ProjectCarousel from "../common/ProjectCarousel";
import ImpactSection from "../common/impact";
import GetInvolvedSection from "../common/getInvolved";
import StoriesSection from "../common/stories";
import CategoryCards from "../common/categoryCards";
import { Link } from "react-router-dom";

function Home({ token }) {
  const { projects: featuredProjects } = useProjects("/fivefeatured/", token);
  const { projects: latestProjects } = useProjects("/projects_latest/", token);
  const { categories, loading, error } = useCategory(token);

  const {
    images: featuredImages,
    imageErrors: featuredErrors,
    handleImageError: handleFeaturedError,
  } = useProjectImages(featuredProjects, token);

  const {
    images: latestImages,
    imageErrors: latestErrors,
    handleImageError: handleLatestError,
  } = useProjectImages(latestProjects, token);

  return (
    <div className="home">
      <HeroSection />

      <section className="container my-5 py-4 bg-light rounded-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Our Categories</h2>
          <Link to="/categories" className="btn check-btn">
            View All Categories <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
        <CategoryCards
          categories={categories}
          loading={loading}
          error={error}
        />
      </section>

      <section className="projects container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-4">Featured Projects</h2>
          <Link to="/projects" className="btn check-btn">
            View All Projects <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
        <ProjectCarousel
          projects={featuredProjects}
          images={featuredImages}
          imageErrors={featuredErrors}
          onImageError={handleFeaturedError}
          carouselId="featuredCarousel"
          fadeEffect={true}
        />
      </section>

      <section className="projects container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-4">Latest Projects</h2>
          <Link to="/projects" className="btn check-btn">
            View All Projects <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
        <ProjectCarousel
          projects={latestProjects}
          images={latestImages}
          imageErrors={latestErrors}
          onImageError={handleLatestError}
          carouselId="latestCarousel"
          fadeEffect={true}
        />
      </section>

      <ImpactSection />
      <GetInvolvedSection />
      <StoriesSection />
    </div>
  );
}

export default Home;
