const express = require("express");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/order");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");
const router = express.Router();

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/order/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

router.get(
  "/order/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);

router.put("/order/status/:orderId/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;
