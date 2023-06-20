const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec()
    .then((ord) => {
      if (!ord) {
        return res.status(400).json({ error: "No order found" });
      }
      req.order = ord;
      next();
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;

  const order = new Order(req.body.order);

  order
    .save()
    .then((order) => {
      if (!order) {
        return res.status(400).json({
          error: "Order not created",
        });
      }
      res.json(order);
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name mobile")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(400).json({
          error: "Order not found",
        });
      }
      res.json(order);
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status".enumValues));
};

exports.updateStatus = (req, res) => {
  Order.updateOne(
    {_id: req.body.orderId, },
    { $set: { status: req.body.status } }
  )
    .then((order) => {
      if (!order) {
        return res.status(400).json({
          error: "Status not updated",
        });
      }
      res.json(order);
    })
    .catch((err) => res.status(400).json({ error: "Something went wrong!!" }));
};
