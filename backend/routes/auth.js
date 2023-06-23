const express = require("express");
const router = express.Router();
const { signout, signup, signin, isSignedIn, verifyOtp } = require("../controllers/auth");
const { check } = require("express-validator");

const signUpValidation = [
  check("first_name")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ max: 40 })
    .withMessage("First name should be less than 40 character"),
  check("last_name")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .isLength({ max: 40 })
    .withMessage("Last name should be less than 40 character"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .trim()
    .isEmail()
    .withMessage("Email is not correct"),
  check("mobile")
    .notEmpty()
    .withMessage("Mobile no is required")
    .trim()
    .isMobilePhone()
    .withMessage("Mobile no is not correct"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Password should contain at least 3 character"),
];

const signInValidation = [
  check("mobile")
    .notEmpty()
    .withMessage("Mobile no is required")
    .trim()
    .isMobilePhone()
    .withMessage("Mobile no is not correct"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Password should contain at least 3 character"),
];

router.post("/signup", signUpValidation, signup);

router.post("/signin", signInValidation, signin);

router.post("/signout", signout);

router.post("/verifyotp", verifyOtp);

// router.get("/testsignin", isSignedIn, (req, res) => res.json(req.auth));

module.exports = router;
