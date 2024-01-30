var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require("express-ejs-layouts");
var cors = require('cors');
const db = require("./config/mongoose");
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require("connect-mongo");

var app = express();

app.use(cors());
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', express.static(path.join(__dirname, 'public')));
app.use('/posts', express.static(path.join(__dirname, 'public')));
app.use('/posts/view', express.static(path.join(__dirname, 'public')));
app.use('/posts/category', express.static(path.join(__dirname, 'public')));

// // mongo strore is used to store session cookie
app.use(
  session({
    secret: "blahblah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://vithaikkul:virutcham@cluster0.ngfqupj.mongodb.net/virutcham_store?retryWrites=true&w=majority"
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
