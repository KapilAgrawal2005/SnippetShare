import { generateOTPEmailTemplate } from "../utils/emailTemplates.js";
import sendEmail from "./sendEmail.js";

export const sendOTP = async (otp, email, res) => {
  try {
    const message = generateOTPEmailTemplate(otp);
    const subject = "OTP for registration on Snippy.";
    const send_from = "Snippy - A Snippet Share Platform";
    const reply_to = "noreply@noreply.com";

    await sendEmail(subject, email, send_from, reply_to, message);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "OTP failed to send.",
    });
  }
};
