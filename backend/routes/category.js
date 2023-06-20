const express = require("express");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { check } = require("express-validator");
const router = express.Router();

const categoryValidation = [
  check("name").notEmpty().withMessage("Category name is required").trim(),
];

//  params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//  actual routes
router.post(
  "/category/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  categoryValidation,
  createCategory
);

router.get(
  "/category/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getCategory
);

router.get("/category", isSignedIn, isAuthenticated, isAdmin, getAllCategory);

router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  categoryValidation,
  updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
