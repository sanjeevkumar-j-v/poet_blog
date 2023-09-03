const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const user = require("../models/user")

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        // find user and establish identity
        user.findOne({email: email}).then((user, err) => {
            if(err){
                console.log("Error is signing in: ", err);
                // req.flash('error', err);
                return done(err);
            }
            if(!user || user.password != password){
                console.log("User found but password is incorrect")
                // req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }

));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    user.findById(id).then((user, err) => {
        if(err){
            Console.log("Error in finding user --> passport");
            return done(err);
        }
        return done(null, user);
    })
})

passport.checkAuthentication = function(req, res, next){
    // If user is signed in, then pass on the request to next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains current signed in user from session cookie and we just sending this to locals
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;