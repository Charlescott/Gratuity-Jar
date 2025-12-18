import { Link } from "react-router-dom";

import { useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  return (
    <header
  style={{
    backgroundColor: "var(--bg-color)",
    padding: "1rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1200px",
      margin: "0 auto", 
      flexWrap: "wrap", 
      gap: "1rem"
    }}
  >
    <h1 style={{ margin: 0, fontSize: "1.8rem", color: "var(--accent-color)" }}>
      Gratuity Jar
    </h1>
    <nav style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Link to="/" style={{ color: "var(--text-color)", fontWeight: "bold" }}>Home</Link>
      <Link to="/entries" style={{ color: "var(--text-color)", fontWeight: "bold" }}>Entries</Link>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: "var(--accent-color)",
          color: "var(--bg-color)",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  </div>
</header>


  );
}
