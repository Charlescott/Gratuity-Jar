// scheduler.js
import cron from "node-cron";
import pool from "./db/index.js";
import { sendReminderEmail } from "./mailer.js";

// Check every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();

  // Query reminders for this exact time (ignore seconds)
  const result = await pool.query(
    `SELECT ur.*, u.email, u.name
     FROM user_reminders ur
     JOIN users u ON u.id = ur.user_id
     WHERE ur.active = TRUE
       AND EXTRACT(HOUR FROM ur.time_of_day) = $1
       AND EXTRACT(MINUTE FROM ur.time_of_day) = $2
       AND (ur.last_sent IS NULL OR ur.last_sent::date < NOW()::date)`,
    [now.getHours(), now.getMinutes()]
  );

  for (let reminder of result.rows) {
    try {
      await sendReminderEmail(reminder.email, reminder.name);
      await pool.query(
        "UPDATE user_reminders SET last_sent = NOW() WHERE id = $1",
        [reminder.id]
      );
    } catch (err) {
      console.error("Failed to send reminder for user:", reminder.user_id, err);
    }
  }
});
