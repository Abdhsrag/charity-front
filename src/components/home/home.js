import "./home.css";
import { useProjects, useProjectImages } from "../hooks/useProjects";
import HeroSection from "../common/hero";
import ProjectCarousel from "../common/ProjectCarousel";
import ImpactSection from "../common/impact";
import GetInvolvedSection from "../common/getInvolved";
import StoriesSection from "../common/stories";

function Home() {
  const { projects: featuredProjects } = useProjects("/fivefeatured/");
  const { projects: latestProjects } = useProjects("/projects_latest/");

  const { 
    images: featuredImages, 
    imageErrors: featuredErrors, 
    handleImageError: handleFeaturedError 
  } = useProjectImages(featuredProjects);

  const { 
    images: latestImages, 
    imageErrors: latestErrors, 
    handleImageError: handleLatestError 
  } = useProjectImages(latestProjects);

  return (
    <div className="home">
      <HeroSection />

      <section className="projects container my-5">
        <h2 className="mb-4">Featured Projects</h2>
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
        <h2 className="mb-4">Latest Projects</h2>
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