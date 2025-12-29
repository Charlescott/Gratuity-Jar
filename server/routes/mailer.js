// mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendReminderEmail(email, name) {
  await transporter.sendMail({
    from: '"Gratuity Jar" <no-reply@gratuityjar.com>',
    to: email,
    subject: "Time to write your gratitude note!",
    html: `<p>Hey ${name},</p>
           <p>Take a moment to reflect and add a new gratitude entry:</p>
           <a href="${process.env.FRONTEND_URL}/entries">Write Gratitude</a>`,
  });
}
