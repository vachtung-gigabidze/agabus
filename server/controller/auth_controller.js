// controllers/AuthController.js
// const bcrypt = require('bcrypt');
// const { executeQuery } = require('../services/dbService');
const OTPService = require('../services/otp_service');
const EmailService = require('../services/email_service');


const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = '';//await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO Users (email, password)
      VALUES (@email, @password)
    `;
    const params = [
      { name: 'email', type: sql.NVarChar, value: email },
      { name: 'password', type: sql.NVarChar, value: hashedPassword },
    ];
    await executeQuery(query, params);

    const otp = OTPService.generateOTP();
    OTPService.storeOTP(email, otp);
    EmailService.sendOTP(email, otp);

    res.status(201).json({ message: 'User registered. Check your email for OTP.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const activate = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOTP = await OTPService.getOTP(email);
    if (storedOTP === otp) {
      const query = `
        UPDATE Users
        SET isActivated = 1
        WHERE email = @email
      `;
      const params = [{ name: 'email', type: sql.NVarChar, value: email }];
      await executeQuery(query, params);

      res.status(200).json({ message: 'Account activated successfully.' });
    } else {
      res.status(400).json({ error: 'Invalid OTP.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, activate };