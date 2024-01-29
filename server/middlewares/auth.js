const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decode.user);

      if (!user) {
        return res.json({ success: false, message: "Unauthorized access!" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.json({ success: false, message: "Unauthorized access!" });
      }
      if (error.name === "TokenExpiredError") {
        return res.json({
          succes: false,
          message: "session epxired try sign in ",
        });
      }
      return res.json({ success: false, message: " Internal Server Error!" });
    }
  } else {
    return res.json({ success: false, message: "Unathorized Access!" });
  }
};

module.exports = { isAuth };
