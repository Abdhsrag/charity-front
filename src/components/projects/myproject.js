import React from "react";
import Card from "react-bootstrap/Card";
import "./myproject.css";
import 'bootstrap-icons/font/bootstrap-icons.css';


function MyProject({ project }) {
  const firstImage = Array.isArray(project.logo) ? project.logo[0] : project.logo;

  return (
    <div className="my-project-card">
      <Card className="h-100">
        <Card.Img variant="top" src={firstImage} className="card-img-top" alt={project.title} />
        <Card.Body>
          <Card.Title className="card-title">{project.title}</Card.Title>
          <Card.Text className="card-text">{project.details}</Card.Text>
          <Card.Text className="card-tags">
            {project.tags && project.tags.map((tag, i) => (
              <span key={i} className="badge bg-secondary me-1">{tag}</span>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MyProject;
