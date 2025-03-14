// services/EmailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.nic.ru',
  auth: {
    user: 'mail',
    pass: 'pass',
  },
});

const sendOTP = (email, otp) => {
  const mailOptions = {
    from: 'mail',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendOTP };