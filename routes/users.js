var express = require('express');
var passport = require("passport");
var router = express.Router();
var Tes = require("../config/tes-");
/* GET users listing. */

router.get('/auth/facebook',
    passport.authenticate('facebook', {scope: ["email", "photos"]}));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/',
        failureFlash: true,
    }), function (req, res) {
      req.session.user = req.user;
      res.redirect("/tests/" + Tes.idProduct);
       // console.log(req.user);
    });

module.exports = router;
