// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import ContactUs from "./components/ContactUs/ContactUs";
import "./components/ContactUs/ContactUs.css";
import AboutUs from "./components/About/AboutUs";
import NotFound from "./components/NotFound/NotFound";
import Projects from "./components/projects/projects";
import CreateProjectForm from "./createProject/CreateProjectForm";
import AddProjectImages from "./createProject/AddProjectImages";
import ProjectDetails from "./components/projects/ProjectDetails";

function App() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5NTkyMjcwLCJpYXQiOjE3NDk1OTE5NzAsImp0aSI6IjM2MDMxZmVhMjM1NjRiNDRhZWQ2N2Y1OWUzODc3YjExIiwidXNlcl9pZCI6MSwiZW1haWwiOiIzbGEyLmE3bWVkNDFAZ21haWwuY29tIiwicm9sZSI6ImRvbm9yIn0.o9Z8hOqxM4w9S8qZmcGxBgVMczuqQpFsODJ6DFICN-4";

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Routes path="/projects" element={<Projects />} />
            <Route
              path="/create-project"
              element={<CreateProjectForm token={token} />}
            />
            <Route
              path="/add-project-images/:projectId"
              element={<AddProjectImages token={token} />}
            />
            <Route
              path="/project/:projectId"
              element={<ProjectDetails token={token} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </header>
    </div>
  );
};

export default App;
