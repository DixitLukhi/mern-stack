const { validationResult } = require("express-validator");
const User = require("../models/user");
var jwt = require("jsonwebtoken");
var { expressjwt } = require("express-jwt");
// const accountSid = process.env.OTPSID;
// const authToken = process.env.OTPAUTH;
// const client = require('twilio')(accountSid, authToken);

let OTP = "";

exports.signup = async (req, res) => {
  const user = new User(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  await user
    .save()
    .then((user) =>
      res.json({
        name: user.name,
        mobile: user.mobile,
        email: user.email,
      })
    )
    .catch((error) => {
      return res.status(400).json({
        error: "Not able to signup user",
      });
    });

  let digits = "0123456789";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  let otpTo = "+91"+user.mobile;
  console.log(otpTo);
  // await client.messages.create({
  //   body: `Hi, please verify your otp ${OTP}.`, from: '+15418978833', to: otpTo
  // })
  //   .then(message => console.log(message.sid, "res : ", message))

};

exports.verifyOtp = (req, res) => {
  const { otp } = req.body;
  if ( otp !== OTP) {
    return res.status(400).json({error : "wrong otp."});
  } else {
    return res.status(200).json({ message : "OTP verified."})
  }
}

exports.signin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { mobile, pass } = req.body;

  User.findOne({ mobile })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User mobile does not exists",
        });
      }

      if (!user.authenticate(pass)) {
        return res.status(401).json({
          error: "Incorrect mobile or password",
        });
      }

      // create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);

      // put token in cookie
      res.cookie("token", token, { expire: new Date() + 30 });

      // send response to frontend
      const { _id, name, email, mobile, role } = user;

      return res.json({ token, user: { _id, name, email, mobile, role } });
    })
    .catch((error) =>
      res.status(400).json({ error: "Sonething went wrong!!" })
    );
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

//  protected routes
exports.isSignedIn = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED!!",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not authorized",
    });
  }
  next();
};
