const Order = require("../models/order");
const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "No User found",
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => res.status(400).json({ error: "Sonething went wrong!!" }));
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.password = undefined;
  req.profile.__v = undefined;

  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false }
  )
    .then((user) => {
      user.salt = undefined;
      user.password = undefined;

      return res.json(user);
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec()
    .then((err, order) => {
      if (!order) {
        return res.status(400).json("No Order Found");
      }

      return res.json(order);
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];

  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true }
  )
    .then((purchases) => {
      next();
    })
    .catch((err) => res.status(400).json("Something went wrong"));

  next();
};

// exports.getAllUsers = (req, res) => {
//   User.find()
//     .exec()
//     .then((users) => {
//       if (!users) {
//         return res.status(400).json({
//           error: "No Users found",
//         });
//       }
//       return res.json(users);
//     })
//     .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
// };
