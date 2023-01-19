const { default: mongoose } = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      unique: true,
    },
    featuredImage: {
      type: String,
      data: Buffer,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("posts", PostSchema);
