const User = require('../models/userModel');
const isLogin = async (req, res, next) => {
  try {
    if (req.session.user1) {
      const userData = await User.findOne({ _id: req.session.user_id })
      if (userData.is_verified) {
        next();
      } else {
        req.session.user1 = null;
        req.session.user=null;
        next();
        // res.render('login', { message: "you are blocked by admin",user:req.session.user })
      }
    } else {
      next()
    }
  } catch (error) {
    console.log(error.message);
  }
};

const isLogout = async (req, res, next) => {
  try {
    if (req.session.user1) {
      res.redirect("/home");
    }
    else {
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  isLogin,
  isLogout,
};
