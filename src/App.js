import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProjectForm from './createProject/CreateProjectForm';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/create-project" element={<CreateProjectForm />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
