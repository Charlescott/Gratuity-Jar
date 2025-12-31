import ReminderForm from "../components/ReminderForm";

export default function RemindersPage() {
  return (
    <div className="reminders-page">
      <h1 className="entries-header">Set Your Gratitude Reminders</h1>

      <div className="reminders-container">
        <p style={{ marginBottom: "1rem", color: "var(--muted-text)" }}>
          Choose when and how often you want to be prompted to fill out your
          gratitude notes.
        </p>
        <ReminderForm />
      </div>
    </div>
  );
}
