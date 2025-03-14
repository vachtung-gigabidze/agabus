// services/OTPService.js
const redis = require('redis');

var client = require('redis').createClient();

client.on('error', function (err) {
  console.log('Error ' + err);
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const storeOTP = (email, otp) => {
  client.set(email, 600, otp); // 10 минут
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






// client.set('string key', 'string val', redis.print);
// client.hset(
//     'hash key',
//     'hashtest 1',
//     'some value',
//     redis.print
// );
// client.hset(
//     ['hash key', 'hashtest 2', 'some other value'],
//     redis.print
// );

// client.hkeys('hash key', function (err, replies) {
//     console.log(replies.length + ' replies:');
//     replies.forEach(function (reply, i) {
//         console.log('    ' + i + ': ' + reply);
//     });

//     client.quit();
// });