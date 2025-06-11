// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import ContactUs from './components/ContactUs/ContactUs';
import  './components/ContactUs/ContactUs.css';
import AboutUs from './components/About/AboutUs';
import NotFound from './components/NotFound/NotFound';
import Projects from "./components/projects/projects";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/contactus" element={<ContactUs/>}/>
            <Route path="/about" element={<AboutUs />}/>
            <Routes path="/projects" element={<Projects/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      <Footer/>
      </Router>
      </header>
    </div>
  );
}

export default App;
