const express = require("express");
const authenticate = require("../middlewares/auth.login");
const categoryModels = require("../models/category.models");
const router = express.Router();

//create category
router.post("/", authenticate, async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name)
      return res
        .status(400)
        .json({ message: "Please fill out all the required fields" });

    const savedCategory = await categoryModels.create({ name, description });

    return res.json(savedCategory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await categoryModels.find();
    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//get single category
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModels.findOne({ _id: id });
    return res.json(category);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//edit a category
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const update = await categoryModels.updateOne(
      { _id: id },
      { name: name, description: description }
    );

    const updatedCategory = await categoryModels.findOne({ _id: id });
    return res.json({ update, updatedCategory });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//delete a category
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    await categoryModels.deleteOne({ _id: id });
    return res.json({ message: "Category deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
