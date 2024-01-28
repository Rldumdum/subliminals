require("express");
const router = require("express").Router();
const Post = require("../models/post");
const Comment = require("../models/comment");

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({
      posts,
    });
  } catch (error) {
    return next(error);
  }
});
router.get("/:postid", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postid);
    return res.status(200).json({
      post,
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const blogPost = new Post({
      title: req.body.title,
      text: req.body.text,
      comments: [],
    });
    await blogPost.save();
    return res.status(200).json({
      message: "Blog post saved successfully",
    });
  } catch (error) {
    return next(error);
  }
});

router.post("/:postid/comment", async (req, res, next) => {
  try {
    const id = req.params.postid;
    const comment = new Comment({
      text: req.body.text,
      post: id,
    });
    await comment.save();
    const postRelated = await Post.findById(id);
    postRelated.comments.push(comment);
    await postRelated.save();
    return res.status(200).json({
      message: "Comment saved successfully",
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
