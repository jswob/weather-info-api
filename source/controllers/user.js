const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const errorGenerator = require("../utils/error-generator");

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  const saltRounds = 15;
  const userData = req.body.user;
  try {
    if (!errors.isEmpty()) errorGenerator(422, errors);
    const hashedPw = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPw;
    const user = new User(userData);
    await user.save();
    return res.status(201).json({ user: user });
  } catch (err) {
    next(err);
  }
};
