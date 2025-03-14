const {test} = require('node:test')
var assert = require('assert');
const otpServices = require('../services/otp_service')


test('test otp services', async t => {
    t.test(`generate otp`, () => {
        otp = otpServices.generateOTP()
       
        

        assert.notEqual(1, 2);
        assert.notEqual(otp, "1");
    });
    
    t.test(`otp store and get`, () => {
        otp = otpServices.generateOTP()
        email = "user@mail.ru" 
        console.log(otp)
        otpServices.storeOTP(email, otp)
        otp2 = otpServices.getOTP(email)
        

        assert.equal(otp, otp2);
       
    });
    
  });