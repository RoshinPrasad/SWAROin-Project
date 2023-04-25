const express = require("express");
const forgot_Password = express();
const forgotP=require("../controllers/forgotPassword");

forgot_Password.set('views', './views/users');

forgot_Password.use(express.static('public'));

forgot_Password.get("/forgot-P",forgotP.loadForgotPassword);

forgot_Password.post("/forgot-P",forgotP.loadVeriftyForgotPassword);

forgot_Password.post("/fnewPassword",forgotP.verifyOtp);

forgot_Password.post("/resetP",forgotP.resetPassword)

forgot_Password.get("/resendotp",forgotP.resendOtp);

module.exports= forgot_Password;