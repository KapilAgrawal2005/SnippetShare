import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (subject, send_to, send_from, reply_to, message) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: send_from,
      to: send_to,
      subject,
      html: message,
      replyTo: reply_to,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.log("Error sending email: ", error);
    throw error;
  }
};

export default sendEmail;
