const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/admin");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use("local.signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({"email": email}, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            req.flash("error", "اسم المستخدم موجود بالفعل");
            return done(null, false, {message: ""});
        }
        if (!user) {
            var newUser = new User();
            newUser.username = req.body.username;
            newUser.password = newUser.encryptPassword(req.body.password);
            newUser.email = req.body.email;
            newUser.role = "admin";
            newUser.save(function (err) {
                if (err) {
                    console.log(err);
                }
                req.flash("success", "تم إضافة المدير بنجاح");
                return done(null, newUser);
            });
        }
    });
}));


passport.serializeUser(function (user, done) {
    return done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use("local.login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({"email": email}, function (err, user) {
        if (err) {
            throw err;
        }
        if (!user || !user.validPassword(password)) {
            req.flash("error", "خطأ في اسم المستخدم أو كلمة المرور");
            return done(null, false, {message: ""});

        }
        if (user) {
            return done(null, user);
        }
    });
}));