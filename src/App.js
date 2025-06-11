// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import ContactUs from './Components/ContactUs/ContactUs';
import  './Components/ContactUs/ContactUs.css';
import './Components/Footer/Footer.css';
import AboutUs from './Components/About/AboutUs';
import NotFound from './Components/NotFound/NotFound';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
                <NavBar/>
          <Routes>
            <Route path="/contactus" element={<ContactUs/>}/>
            <Route path="/about" element={<AboutUs />}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
      <Footer/>
      </Router>
      </header>
    </div>
  );
}

export default App;
