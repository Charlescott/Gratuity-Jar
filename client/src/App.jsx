import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import GratitudeEntries from "./pages/GratitudeEntries";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entries" element={<GratitudeEntries />} />
      </Routes>
    </Router>
  );
}

export default App;
