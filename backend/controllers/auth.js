const User = require("../models/user");

exports.signup = (req, res) => {

  const user = new User(req.body);

  user.save().then((user) => res.json({
    name: user.name,
    mobile: user.mobile
  })).catch((err) => {
    return res.status(400).json({
      err: "Not able to signup user"
    })
  })
};

exports.signout = (req, res) => {
  res.json({
    message: "User signout"
  });
};


