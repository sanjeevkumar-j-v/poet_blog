var express = require('express');
var router = express.Router();
const passport = require("passport");
const Like = require('../models/like');
const Post = require('../models/post');


router.post("/:post", async function (req, res) {

  try{
    let existingLike = await Like.findOne({
      user: req.user.id,
      post: req.params.post
    })
    if (!existingLike) {
      let newLike = await Like.create({
        user: req.user._id,
        post: req.params.post   
      });
    }
    let post = await Post.findByIdAndUpdate(
      req.params.post, 
      {$inc : {'likes_count' : 1}},
      {new: true}
    );

    return res.status(200).json({
      message: "Request succesfull"
    })
  }catch(err){
      console.log(err);
      return res.status(500).json({
        message: "Request failed",
      })
  }

});


module.exports = router;