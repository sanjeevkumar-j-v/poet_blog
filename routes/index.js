var express = require('express');
var router = express.Router();
var usersRouter = require("./users");
var postsRouter = require("./posts");
var commentsRouter = require("./comments");
var likesRouter = require("./likes");
const Post = require('../models/post');
// const passport = require('passport');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var newPosts = await Post.find({}).sort({createdAt: -1}).limit(6);
  var mostLikedPosts = await Post.find({}).sort({likes_count: -1}).limit(3);

  res.render('index', {
    newPosts,
    mostLikedPosts,
    title: 'Muthu\'s Blog'
  });
});

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/like", likesRouter);

module.exports = router;