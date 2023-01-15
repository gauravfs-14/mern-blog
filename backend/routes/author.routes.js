const express = require("express");
const authenticate = require("../middlewares/auth.login");
const authorModels = require("../models/author.models");
const router = express.Router();

//create author
router.post("/", authenticate, async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!name || !email)
      return res
        .status(400)
        .json({ message: "Please fill out all the required fields" });

    const savedAuthor = await authorModels.create({
      name,
      email,
    });

    res.json(savedAuthor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//get all the authors
router.get("/", async (req, res) => {
  try {
    const authors = await authorModels.find();
    return res.json(authors);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//get single author
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const author = await authorModels.findOne({ _id: id });
    return res.json(author);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//edit a author
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;

    const update = await authorModels.updateOne(
      { _id: id },
      { name: name, email: email }
    );

    const updatedAuthor = await authorModels.findOne({ _id: id });
    return res.json({ update, updatedAuthor });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//delete a author
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    await authorModels.deleteOne({ _id: id });
    return res.json({ message: "Author deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
