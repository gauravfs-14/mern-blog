const express = require("express");
const authenticate = require("../middlewares/auth.login");
const postModels = require("../models/post.models");
const router = express.Router();
const fs = require("fs");

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await postModels
      .find()
      .populate("category", "name")
      .populate("author", "name");
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await postModels
      .findOne({ _id: req.params.id })
      .populate("category")
      .populate("author");
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//create a post
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, content, featuredImage, author, category, slug } = req.body;
    if (!title || !content || !author || !category || !slug)
      return res
        .status(400)
        .json({ message: "Please fill out all the required fields" });
    if (featuredImage) {
      const featuredUrl = fs.writeFileSync("../uploads/img/", featuredImage);
      console.log(featuredUrl);
    }
    const savedPost = await postModels.create({
      title,
      content,
      featuredImage,
      author,
      category,
      slug,
    });
    return res.json(savedPost);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
