const express = require("express");
const { getProductById, createProduct, getProduct, photo, removeProduct, updateProduct, getAllProducts } = require("../controllers/product.js");
const { getUserById } = require("../controllers/user");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const router = express.Router();
const multer  = require('multer');
const upload = multer();

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post("/product/:userId", isSignedIn, isAuthenticated, isAdmin, upload.single('photo'),createProduct);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.get("/product", getAllProducts);

router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct);

// router.get("/product/category", )

module.exports = router;