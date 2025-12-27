import { useEffect, useState } from "react";

export default function GratitudeEntries({ token }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");
  const [moodTag, setMoodTag] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content, mood_tag: moodTag }),
      });

      if (!res.ok) throw new Error("Failed to add entry");

      const newEntry = await res.json();
      setEntries((prev) => [{ ...newEntry, show: false }, ...prev]);
      setContent("");
      setMoodTag("");

      // trigger animation in next tick
      setTimeout(() => {
        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === newEntry.id ? { ...entry, show: true } : entry
          )
        );
      }, 50);
    } catch (err) {
      setError(err.message);
    }
  }

  // handle Delete
  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/entries/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete entry");

      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  // Fetch entries from backend
  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch("http://localhost:5000/entries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch entries");
        const data = await res.json();
        setEntries(data.map((entry) => ({ ...entry, show: true })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="entries-container">
      <h1>Gratuity Jar</h1>

      {/* Form section */}
      <div className="entry-card">
        <h2>Add a Gratitude Entry</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What are you grateful for?"
            required
          />
          <input
            type="text"
            value={moodTag}
            onChange={(e) => setMoodTag(e.target.value)}
            placeholder="Mood (optional)"
          />
          <button className="btn btn-secondary" type="submit" disabled={!content.trim()}>
            Add Entry
          </button>
        </form>
      </div>

      {/* Entries list section */}
      <div>
        <h2>Your Entries</h2>
        {entries.length === 0 ? (
          <p>No entries yet. Add one!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {entries.map((entry) => (
              <li
                key={entry.id}
                className={`entry-item ${entry.show ? "show" : ""}`}
              >
                <div className="entry-item-content">
                  <strong>
                    {new Date(entry.created_at).toLocaleDateString()}:
                  </strong>{" "}
                  {entry.content} {entry.mood_tag && `(${entry.mood_tag})`}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(entry.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
