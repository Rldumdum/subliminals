const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const account_sign_in = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.json({
      message: "Username does not exist, create an account instead?",
    });
  }
  try {
    const match = await bcrypt.compare(req.body.password, user.password);
    const accessToken = jwt.sign({ user: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    if (match) {
      let oldTokens = user.tokens || [];

      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 86400) {
            return t;
          }
        });
      }

      await User.findByIdAndUpdate(user._id, {
        tokens: [
          ...oldTokens,
          { accessToken, signedAt: Date.now().toString() },
        ],
      });
      const userInfo = {
        username: user.username,
        _id: user._id,
      };
      res.json({ success: true, userInfo, accessToken });
    } else {
      res.json({ message: "Incorrect Username or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const account_sign_up = async (req, res, next) => {
  if (!req.body)
    return res.status(400).json({ message: "Please fill out all fields" });
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: hashedPassword,
      gender: req.body.gender,
      birthday: req.body.birthday,
    });
    const savedUser = await user.save();
    return res.status(200).json(savedUser);
  } catch (error) {
    res.json(error);
  }
};
const account_sign_out = async (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization Failed" });
    }

    const tokens = req?.user?.tokens;

    const newTokens = tokens.filter((t) => t.accessToken !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: "Signed out successfully" });
  } else {
    res.json({ success: false, message: "Authorization Failed" });
  }
};

const account_verify = async (req, res, next) => {
  res.json({ success: true, user: req.user });
};
module.exports = {
  account_sign_in,
  account_sign_up,
  account_sign_out,
  account_verify,
};
