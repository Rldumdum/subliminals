const router = require("express").Router();
const { response } = require("express");
const { isAuth } = require("../middlewares/auth");
const cloudinary = require("cloudinary");

router.get("/beauty", isAuth, (req, res) => {
  cloudinary.v2.api
    .resources({
      type: "upload",
      prefix: "Beauty_Videos",
      resource_type: "video",
    })
    .then((response) => {
      res.status(200).json({ message: "Success", response: response });
      console.log(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error", error: error });
      console.log(error);
    });
});

router.get("/mental-health", isAuth, (req, res) => {
  cloudinary.v2.api
    .resources({
      type: "upload",
      prefix: "Beauty_Videos",
      resource_type: "video",
    })
    .then((response) => {
      res.status(200).json({ message: "success", response: response });
    })
    .catch((error) => {
      res.status(500).json({ message: "error", error: error });
    });
});
module.exports = router;
