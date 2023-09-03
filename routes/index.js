var express = require('express');
var router = express.Router();
var usersRouter = require("./users");
var postsRouter = require("./posts");

// const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Muthu\'s Blog'
  });
});

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

module.exports = router;