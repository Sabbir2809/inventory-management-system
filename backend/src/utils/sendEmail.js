// Dependencies
const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.smtp_user,
    pass: config.smtp_password,
  },
});

exports.sendEmail = async (emailData) => {
  try {
    const mailOptions = {
      from: config.smtp_user, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error occurred while sending email: ", error.message);
  }
};
