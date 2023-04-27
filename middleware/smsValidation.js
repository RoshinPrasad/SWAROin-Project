const fast2sms = require("fast-two-sms");
require("dotenv").config();



const sendMessage = function (mobile, res, next) {
  // let randomOTP = Math.floor(Math.random() * 9000)+1000;
  let randomOTP = 2759; // replace with hardcoded value
  var options = {
    authorization :process.env.SMS_API,
    message: `your OTP verification code is ${randomOTP}`,
    numbers: [mobile],
  };



  //send this message
  fast2sms
    .sendMessage(options)
    .then((response) => {
      console.log("otp sent successfully");
    })
    .catch((error) => {
      console.log(error);
    });
  return randomOTP;
};


module.exports = {
  sendMessage,
};