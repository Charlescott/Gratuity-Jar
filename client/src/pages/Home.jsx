import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="home">
      <img
        src={logo}
        alt="Gratuity Jar logo"
        className={`home-logo ${visible ? "show" : ""}`}
      />

      <h1>Gratuity Jar</h1>

      <p className="tagline">A simple place to pause and notice what’s good.</p>

      <button className="primary">Start journaling</button>
    </div>
  );
}
