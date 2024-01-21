const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
    },
    likes_count: {
      type: Number,
      default: 1
    },
    views: {
      type: Number,
      default: 1
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;