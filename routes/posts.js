var express = require('express');
var router = express.Router();
const passport = require("passport");
const Post = require('../models/post');

router.get("/create", passport.checkAuthentication, function (req, res) {
  return res.render("createpost");
});

router.post("/create", function (req, res) {
  Post.create(req.body).then((post) => {
      console.log("Post Created : ", post);
      res.redirect('/');
  })
});

module.exports = router;