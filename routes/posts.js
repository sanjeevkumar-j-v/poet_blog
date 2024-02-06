var express = require('express');
var router = express.Router();
const passport = require("passport");
const Post = require('../models/post');
const Comment = require('../models/comment');

router.get("/create", passport.checkAuthentication, function (req, res) {
  return res.render("createpost");
});

router.post("/create", function (req, res) {
  Post.create(req.body).then((post) => {
      console.log("Post Created : ", post);
      res.redirect('/');
  })
});

router.get("/view/:postId", async function (req, res) {
  var post = await Post.findByIdAndUpdate(req.params.postId, {$inc : {'views' : 1}},);
  var comments = await Comment.find({post: req.params.postId});

  res.render('post', {
    post,
    comments,
    title: post.heading
  });
});

router.get("/delete/:postId", async function (req, res) {
  await Post.findByIdAndDelete(req.params.postId);
  await Comment.deleteMany({post: req.params.postId});
  res.redirect('/');
});

router.get("/category/:category", async function (req, res) {
  var posts;
  if (req.params.category == 'all') {
    posts = await Post.find({}).sort({createdAt: -1}); // need to handle load more option
  } else {
    posts = await Post.find({category: req.params.category}).sort({createdAt: -1}); // need to handle load more option
  }

  res.render('category', {
    posts,
    title: req.params.category
  });
});

module.exports = router;