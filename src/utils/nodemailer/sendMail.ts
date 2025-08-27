import nodemailer from "nodemailer";
import { config } from "../../config";

const transporter = nodemailer.createTransport({
  host: config.hostingerWebMailHost,
  port: config.hostingerWebMailPort, // 465 (SSL) or 587 (TLS)
  secure: config.hostingerWebMailPort === 465, // true for 465, false for 587
  auth: {
    user: config.hostingerWebMailUser,
    pass: config.hostingerWebMailPass,
  },
});


/**
 * Send notification to admin when a user signs up
 */
async function sendAdminSignupNotification(
  clientEmail: string,
  newUserEmail: string
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: clientEmail,
      subject: "🔔 New User Signup Alert - PureCheckup",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2C3E50;">🔔 New User Signup</h2>
          <p>Hello Admin,</p>
          <p>A new user has just registered on <strong>PureCheckup</strong>.</p>
          <p><strong>User Email:</strong> ${newUserEmail}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">This is an automated message from PureCheckup.</p>
        </div>
      `,
    });

    console.log("✅ Admin notification sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending admin notification:", err);
    return false;
  }
}

/**
 * Send welcome email to the user who just signed up
 */
async function sendUserWelcomeEmail(
  userEmail: string
): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"PureCheckup" <${config.hostingerWebMailUser}>`,
      to: userEmail,
      subject: "🎉 Welcome to PureCheckup!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #27AE60;">🎉 Welcome to PureCheckup!</h2>
          <p>Hi there,</p>
          <p>Thank you for signing up with <strong>PureCheckup</strong>. We’re excited to have you on board!</p>
          <p>With PureCheckup, you can easily manage your health checkups, track appointments, and stay connected with trusted healthcare providers.</p>
          <p style="margin-top: 20px;">👉 <a href="https://purecheckup.com" style="color: #27AE60; text-decoration: none; font-weight: bold;">Visit Your Dashboard</a></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">This is an automated welcome email from PureCheckup.</p>
        </div>
      `,
    });

    console.log("✅ User welcome email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending welcome email:", err);
    return false;
  }
}

export { sendAdminSignupNotification, sendUserWelcomeEmail }