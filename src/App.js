import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
        </Router>
      </header>
    </div>
  );
}

export default App;
