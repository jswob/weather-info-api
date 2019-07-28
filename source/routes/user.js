const express = require("express");
const User = require("../models/user");
const { check } = require("express-validator");

const userControllers = require("../controllers/user");

const router = express.Router();

router.post(
  "/",
  [
    check("user.email")
      .isEmail()
      .withMessage("Email must be a valid email address")
      .custom(async email => {
        const user = await User.findOne({ email: email });
        if (user) {
          return Promise.reject("E-mail already in use");
        }
        return true;
      }),
    check("user.password")
      .isLength({ min: 6, max: 40 })
      .withMessage(
        "Password must contains min: 6 characters max: 40 characters"
      )
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)
      .withMessage(
        "Password must include at least one upper case letter, one lower case letter, and a number"
      )
  ],
  userControllers.createUser
);

module.exports = router;
