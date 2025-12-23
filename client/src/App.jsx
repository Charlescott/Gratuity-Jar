import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import GratitudeEntries from "./pages/GratitudeEntries";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const isAuthenticated = Boolean(token);

  function handleLogin(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function handleLogout() {
    setToken("");
    localStorage.removeItem("token");
  }

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div
        style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}
      >
        <Routes>
          <Route
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/entries"
            element={
              isAuthenticated ? (
                <GratitudeEntries token={token} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
