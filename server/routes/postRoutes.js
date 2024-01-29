require("express");
const router = require("express").Router();
const {
  get_post,
  get_post_by_id,
  post_create_post,
  post_create_comment,
} = require("../controllers/postController");
const { isAuth } = require("../middlewares/auth");

router.get("/", isAuth, get_post);
router.get("/:postid", isAuth, get_post_by_id);

router.post("/", isAuth, post_create_post);

router.post("/:postid/comment", isAuth, post_create_comment);

module.exports = router;
