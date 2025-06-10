import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProjectForm from './createProject/CreateProjectForm';
import AddProjectImages from './createProject/AddProjectImages';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectDetails from './projectDetails/ProjectDetails';

function App() {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5NTE0NDI1LCJpYXQiOjE3NDk1MTQxMjUsImp0aSI6Ijk2YTJkNGJhYmU2YzQ3Njg4ZWMzZGNmYTY4OTM2OGE3IiwidXNlcl9pZCI6MSwiZW1haWwiOiIzbGEyLmE3bWVkNDFAZ21haWwuY29tIiwicm9sZSI6ImRvbm9yIn0.28agQ2MAiPt0bL8y9FMukWJLIL1meh-rCwSUtq3JYLg';

  return (
      <Router>
      <Routes>
        <Route path="/create-project" element={<CreateProjectForm token={token}/>} />
        <Route path="/add-project-images/:projectId" element={<AddProjectImages token={token} />} />
        <Route path="/project/:projectId" element={<ProjectDetails token={token} />} />


        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
