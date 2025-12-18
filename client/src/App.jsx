import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import GratitudeEntries from "./pages/GratitudeEntries";

function App() {
  return (
    <Router>
      <Header />
      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entries" element={<GratitudeEntries />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
