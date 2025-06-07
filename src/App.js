import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact>
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
