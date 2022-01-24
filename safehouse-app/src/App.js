import Login from './components/Login/Login';
import Desk from './components/Desk/Desk';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/desk" element={<Desk />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
