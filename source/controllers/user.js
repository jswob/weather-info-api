const User = require("../models/user");

exports.createUser = async (req, res, next) => {
  const user = req.body.user;
  try {
    if (!user) {
      throw new Error("The user has not been sent");
    }
    const newUser = new User(user);
    await newUser.save();
    res.json({ user: newUser });
  } catch (err) {
    next(err);
  }
};
