import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendReminderEmail(to, name) {
  const message = `Hi ${
    name || "there"
  }, \n\nIt's time to add a gratitude entry!`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Your Gratitude Reminder 💛",
    text: message,
  });

  console.log(`📧 Reminder sent to ${to}`);
}
