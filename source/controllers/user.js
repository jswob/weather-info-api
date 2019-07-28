const User = require("../models/user");
const { validationResult } = require("express-validator");

const errorGenerator = require("../utils/error-generator");

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  const user = req.body.user;
  try {
    if (!errors.isEmpty()) errorGenerator(422, errors);
    const newUser = new User(user);
    await newUser.save();
    res.json({ user: newUser });
  } catch (err) {
    next(err);
  }
};
