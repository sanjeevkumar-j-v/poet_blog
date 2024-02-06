var express = require('express');
var router = express.Router();
const passport = require("passport");
const Comment = require('../models/comment');


router.post("/add", passport.checkAuthentication, function (req, res) {
  Comment.create(req.body).then((comment) => {
      console.log("comment added : ", comment);
      res.redirect('back');
  })
});
router.get("/delete/:commentId", async function (req, res) {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.redirect('back');
});


module.exports = router;