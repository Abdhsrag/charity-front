import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddProjectImages = ({ token }) => {
  const { projectId } = useParams();
  const [projectTitle, setProjectTitle] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  // Fetch project title by ID
  useEffect(() => {
  axios
    .get(`http://localhost:8000/api/project/project/${projectId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setProjectTitle(res.data.title);
    })
    .catch((err) => console.error("Error fetching project:", err));
}, [projectId, token]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();


  if (!selectedFiles.length) {
    alert("Please select at least one image.");
    return;
  }

  try {
    for (let file of selectedFiles) {
      const formData = new FormData();
      formData.append("url", file); // ✅ match Django's image field
      formData.append("project_id", projectId); // ✅ match expected field

      await axios.post("http://localhost:8000/api/project-images/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    }

    alert("Upload successful!");
    navigate(`/project/${projectId}`);
  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed. Check console for details.");
  }
};


  return (
    <Container style={{ marginTop: "2rem" }}>
      <h2>Upload Images for Project</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Project</Form.Label>
          <Form.Control type="text" value={projectTitle} disabled />
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Select Project Images</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>

        <Button type="submit">Upload</Button>
      </Form>
    </Container>
  );
};

export default AddProjectImages;
