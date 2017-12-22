var passport = require("passport");
var configAuth = require("./auth");
var User = require("../models/user");
var facebookStrategy = require("passport-facebook").Strategy;

passport.use("facebook", new facebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields
}, function (req, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        User.findOne({"facebook": profile.id}, function (err, user) {
           if (err) {

               return done(err);
           }
           if (user) {
               return done(null, user);
           } else {
               var newUser = new User();
               newUser.facebook = profile.id;
               newUser.token = accessToken;
               newUser.username = profile.displayName;
               newUser.role = "user";
               newUser.userImage = profile._json.picture.data.url;
               newUser.save(function (err) {
                   return done(null, newUser);
               });
           }
        });
    });
}));