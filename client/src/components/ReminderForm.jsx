import { useState } from "react";

export default function ReminderForm() {
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!time) {
      setError("Please select a time for your reminder.");
      return;
    }

    // Example: send to backend
    // fetch("/api/reminders", { method: "POST", body: JSON.stringify({ time, frequency }) })

    setSuccess(`Reminder set for ${time} (${frequency})!`);
  };

  return (
    <div className="entry-card">
      <h2>Set a Reminder</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label>
          Time of day:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>

        <label>
          Frequency:
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          Enable reminders
        </label>

        <button className="btn btn-secondary" type="submit">
          Set Reminder
        </button>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
