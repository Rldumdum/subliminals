const {isAuth} = require("../middlewares/auth");
require("express");
const router = require("express").Router();
const {
  account_sign_in,
  account_sign_up,
  account_sign_out,
} = require("../controllers/accountController");

router.post("/signUp", account_sign_up);
router.post("/signIn", account_sign_in);
router.post("/signOut", isAuth, account_sign_out);
module.exports = router;
