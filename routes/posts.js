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
  var post = await Post.findById(req.params.postId);
  var comments = await Comment.find({post: req.params.postId});

  res.render('post', {
    post,
    comments,
    title: post.heading
  });
});

router.get("/delete/:postId", async function (req, res) {
  await Post.findByIdAndDelete(req.params.postId);
  res.redirect('/');
});

module.exports = router;