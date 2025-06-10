import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const CreateProjectForm = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    target: '',
    category_id: '',
    S_time: '',
    E_time: '',
  });

  // Fetch categories with Bearer token
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/categories/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    delete formData.id;

    axios
      .post('http://127.0.0.1:8000/api/project/project/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const newProjectId = res.data.id;
        alert('Project created successfully');
        window.location.href = `/add-project-images/${newProjectId}`;
      })
      .catch((error) => {
          if (error.response) {
            console.error("Validation error:", error.response.data);
          } else {
             console.error("Error creating project:", error.message);
          }
});

  };

  return (
    <div style={{ backgroundColor: '#FAFAFA', minHeight: '100vh', padding: '2rem 0' }}>
      <Container>
        <h2 style={{ color: '#0F1417', marginBottom: '2rem' }}>Start a New Project</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label style={{ color: '#0F1417' }}>Project Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                height: '56px',
                width: '448px',
                minWidth: '160px',
                borderRadius: '12px',
                border: '1px solid #E2E6EB',
                padding: '15px',
                backgroundColor: '#FAFAFA',
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="details">
            <Form.Label style={{ color: '#0F1417' }}>Project details</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="details"
              value={formData.details}
              onChange={handleChange}
              style={{
                height: '176px',
                width: '448px',
                minWidth: '160px',
                borderRadius: '12px',
                border: '1px solid #E2E6EB',
                padding: '15px',
                backgroundColor: '#FAFAFA',
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="target">
            <Form.Label style={{ color: '#0F1417' }}>Project Goal</Form.Label>
            <Form.Control
              type="text"
              name="target"
              value={formData.target}
              onChange={handleChange}
              style={{
                height: '56px',
                width: '448px',
                minWidth: '160px',
                borderRadius: '12px',
                border: '1px solid #E2E6EB',
                padding: '15px',
                backgroundColor: '#FAFAFA',
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category_id">
            <Form.Label style={{ color: '#0F1417' }}>Category</Form.Label>
            <Form.Select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              style={{
                height: '56px',
                width: '448px',
                minWidth: '160px',
                borderRadius: '12px',
                border: '1px solid #E2E6EB',
                padding: '15px',
                backgroundColor: '#FAFAFA',
              }}
            >
              <option value="">Select</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="S_time">
                <Form.Label style={{ color: '#0F1417' }}>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="S_time"
                  value={formData.S_time}
                  onChange={handleChange}
                  style={{
                    height: '56px',
                    width: '448px',
                    minWidth: '160px',
                    borderRadius: '12px',
                    border: '1px solid #E2E6EB',
                    padding: '15px',
                    backgroundColor: '#FAFAFA',
                  }}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="E_time">
                <Form.Label style={{ color: '#0F1417' }}>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="E_time"
                  value={formData.E_time}
                  onChange={handleChange}
                  style={{
                    height: '56px',
                    width: '448px',
                    minWidth: '160px',
                    borderRadius: '12px',
                    border: '1px solid #E2E6EB',
                    padding: '15px',
                    backgroundColor: '#FAFAFA',
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: '#DCEBFA',
              color: '#0F1417',
              border: 'none',
              marginTop: '1rem',
            }}
          >
            Submit Project
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateProjectForm;
