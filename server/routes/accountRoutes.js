const { isAuth } = require("../middlewares/auth");
require("express");
const router = require("express").Router();
const {
  account_sign_in,
  account_sign_up,
  account_sign_out,
  account_verify,
} = require("../controllers/accountController");

const {
  userValidation,
  validateUserSignIn,
  validateUserSignUp,
} = require("../middlewares/validation/user");

router.post("/verify", isAuth, account_verify);
router.post("/signUp", validateUserSignUp, userValidation, account_sign_up);
router.post("/signIn", validateUserSignIn, userValidation, account_sign_in);
router.post("/signOut", isAuth, account_sign_out);
module.exports = router;
