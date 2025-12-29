import { useState } from "react";

export default function ReminderForm() {
  const [frequency, setFrequency] = useState("daily");
  const [time, setTime] = useState("09:00");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Saving...");

    try {
      const res = await fetch("http://localhost:5000/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ frequency, time_of_day: time }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      setStatus("Reminder saved!");
    } catch (err) {
      setStatus(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Frequency:
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>

      <label>
        Time:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>

      <button type="submit">Save Reminder</button>
      {status && <p>{status}</p>}
    </form>
  );
}
