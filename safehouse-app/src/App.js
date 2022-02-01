import Login from './components/Login/Login';
import Desk from './components/Desk/Desk';
import Letter from './components/Letter/Letter';
import Inbox from './components/Inbox/Inbox';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/desk" element={<Desk />} />
          <Route path="/letter" element={<Letter/>} />
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
