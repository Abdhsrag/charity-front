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
import ProjectDetails from "./projectDetails/ProjectDetails";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ActivateAccount from "./components/Auth/ActivateAccount/ActivateAccount";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import UserProfile from "./components/UserProfile/UserProfile";
import Category from "./components/category/category";

function App() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5Nzk5NjM1LCJpYXQiOjE3NDk3OTkzMzUsImp0aSI6Ijk5ZTU2MGYyMTY2NTRlZTY4ZGFlOGFiZTlmYjQxZDMwIiwidXNlcl9pZCI6MSwiZW1haWwiOiJhYmRoc3JhZ0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.YGHnI1PIvSN0fRlf2DDwdX5QWPjUTj3Ty2Sm8HXxmmg";
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/user/*" element={<UserProfile />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/activate/:uid/:token" element={<ActivateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:uid/:token"
              element={<ResetPassword />}
            />
            <Route path="/categories" element={<Category token={token} />} />
            <Route path="/" element={<Home token={token} />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/projects" element={<Projects />} />
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
}

export default App;
