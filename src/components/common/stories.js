import React from "react";

const StoriesSection = () => {
  const PLACEHOLDER_IMAGE = "https://placehold.co/600x400?text=No+Image";

  const stories = [
    {
      id: 1,
      image: "/assets/1.jpeg",
      title: "Building Hope in Rural Communities",
      description:
        "How our water well project transformed a village of 500 families.",
    },
    {
      id: 2,
      image: "/assets/2.jpeg",
      title: "Sustainable Farming Initiative",
      description:
        "Local farmers increase crop yields by 40% through our training program.",
    },
    {
      id: 3,
      image: "/assets/3.jpeg",

      title: "Education Changes Everything",
      description:
        "Meet Sarah, whose scholarship opened doors to a brighter future.",
    },
  ];

  return (
    <section className="stories container my-5">
      <h2 className="mb-4">Stories of Change</h2>
      <div className="row">
        {stories.map((story) => (
          <div className="col-md-4" key={story.id}>
            <div className="card mb-4">
              <img
                src={story.image}
                className="card-img-top"
                alt={story.title}
                onError={(e) => {
                  e.target.src = PLACEHOLDER_IMAGE;
                }}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{story.title}</h5>
                <p className="card-text">{story.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoriesSection;
