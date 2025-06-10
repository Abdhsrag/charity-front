import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProjectForm from './createProject/CreateProjectForm';
import AddProjectImages from './createProject/AddProjectImages';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectDetails from './projectDetails/ProjectDetails';

function App() {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5NTkyMjcwLCJpYXQiOjE3NDk1OTE5NzAsImp0aSI6IjM2MDMxZmVhMjM1NjRiNDRhZWQ2N2Y1OWUzODc3YjExIiwidXNlcl9pZCI6MSwiZW1haWwiOiIzbGEyLmE3bWVkNDFAZ21haWwuY29tIiwicm9sZSI6ImRvbm9yIn0.o9Z8hOqxM4w9S8qZmcGxBgVMczuqQpFsODJ6DFICN-4';

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
