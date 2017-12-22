var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require("express-session");
const flash = require("connect-flash");
const hbs = require("express-handlebars");
const handlebars = require("handlebars");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const multer = require("multer");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect("mongodb://tarek:tarek@ds047622.mlab.com:47622/script-asks");
const db = mongoose.connection;
const mongooseDelete = require("mongoose-delete");
var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var app = express();

require("./config/admin/login");
require("./config/user");
// view engine setup
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("hbs", hbs({defaultLayout: "layout", extname: "hbs"}));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// use session module
app.use(session({
    secret: "max",
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.message = require("express-messages")(req, res);
    if (req.isAuthenticated() && req.user.role == "admin") {
        res.locals.admin = req.isAuthenticated();
    }
    if (req.isAuthenticated() && req.user.role == "user") {
        res.locals.user = req.isAuthenticated();
    }
    if (!req.isAuthenticated()) {
        res.locals.notUser = !req.isAuthenticated();
    }
    next();
});
app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
