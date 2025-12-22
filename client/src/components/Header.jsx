import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ token, onLogout }) {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/"); // send user back to home
  };

  return (
    <header
      className="header"
      style={{
        backgroundColor: "#f2f2f2",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
        Gratuity Jar
      </h1>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={toggleTheme} style={{ marginRight: "1rem" }}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <nav>
          <Link to="/" style={{ marginRight: "1rem", fontWeight: "bold" }}>
            Home
          </Link>
          <Link
            to="/entries"
            style={{ marginRight: "1rem", fontWeight: "bold" }}
          >
            Entries
          </Link>

          {token ? (
            <button onClick={handleLogout} style={{ fontWeight: "bold" }}>
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                style={{ marginRight: "1rem", fontWeight: "bold" }}
              >
                Login
              </Link>
              <Link to="/register" style={{ fontWeight: "bold" }}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
