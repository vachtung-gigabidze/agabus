// services/OTPService.js
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const storeOTP = (email, otp) => {
  client.setex(email, 600, otp); // 10 минут
};

const getOTP = (email) => {
  return new Promise((resolve, reject) => {
    client.get(email, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = { generateOTP, storeOTP, getOTP };