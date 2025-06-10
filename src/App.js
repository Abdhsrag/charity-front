import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import Projects from "./components/projects/projects";
import ProjectDetails from "./components/projects/projectDetails";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/projects" component={Projects} />
            <Route path="/projectDetails/:id" component={ProjectDetails} />
          </Switch>
          <Footer />
        </Router>
      </header>
    </div>
  );
}

export default App;
