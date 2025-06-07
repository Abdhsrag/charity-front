import React from 'react';
import { Form, Button, Container} from 'react-bootstrap';
import './style.css';

const CreateProjectForm = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '2rem 0', backgroundColor: '#FAFAFA' }}>
      <Container>
        <h2 style={{ color: '#0F1417', marginBottom: '2rem' }}>Start a New Project</h2>
        <Form>
          <div className="custom-form-group">
            <Form.Label>Project Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Project Title" name="title" />
          </div>

          <div className="custom-form-group">
            <Form.Label>Project Description</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Enter Project Description" name="description" />
          </div>

          <div className="custom-form-group">
            <Form.Label>Project Target</Form.Label>
            <Form.Control type="number" placeholder="Enter Target" name="target" />
          </div>

          <div className="custom-form-group">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category_id">
              <option>Select</option>
              <option value="1">Education</option>
              <option value="2">Health</option>
              <option value="3">Environment</option>
            </Form.Select>
          </div>

          
            
              <div className="custom-form-group">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" name="S_time" />
              </div>
          
            
              <div className="custom-form-group">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" name="E_time" />
              </div>
           
          

          <Button className="btn-submit" type="submit">
            Submit Project
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CreateProjectForm;
