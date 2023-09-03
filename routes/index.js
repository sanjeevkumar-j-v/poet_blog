var express = require('express');
var router = express.Router();
var usersRouter = require("./users");
var postsRouter = require("./posts");
const Post = require('../models/post');
// const passport = require('passport');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var posts = await Post.find({}).sort({
    createdAt: -1,
  });

  res.render('index', {
    posts,
    title: 'Muthu\'s Blog'
  });
});

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

module.exports = router;