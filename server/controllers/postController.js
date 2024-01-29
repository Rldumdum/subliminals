const Post = require("../models/post");
const Comment = require("../models/comment");

const get_post = async (req, res, next) => {
  try {
    const posts = await Post.find();
    const comment = await Comment.find(posts._id);
    const postWithComments = posts.map((post) => {
      return {
        ...post._doc,
        comments: comment,
      };
    });
    return res.status(200).json({
      postWithComments,
    });
  } catch (error) {
    return next(error);
  }
};

const get_post_by_id = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postid);
    return res.status(200).json({
      post,
    });
  } catch (error) {
    return next(error);
  }
};

const post_create_post = async (req, res, next) => {
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
};

const post_create_comment = async (req, res, next) => {
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
};

module.exports = {
  get_post,
  get_post_by_id,
  post_create_post,
  post_create_comment,
};
