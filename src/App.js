import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import Category from "./components/category/category";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/categories" component={Category} exact/>
          </Switch>
          <Footer />
        </Router>
      </header>
    </div>
  );
}

export default App;
