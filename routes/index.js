var express = require('express');
var router = express.Router();
var Test = require("../models/tests");
var Adds = require("../models/adds");
var Tes = require("../config/tes-")
/* GET home page. */
function execTests(data, adds) {
    router.get('/', function(req, res, next) {
        Adds.findOne({"addNumber": 1}, function (err, add) {
            if (err) {
                return res.render('index', { title: 'script', user: req.session.user, data: data});
            }
            if (add) {
                adds = add;
            }
        });
        Test.find().sort("-testDate").exec(function (err, test) {
            if (err) {
                console.log(err);
                return res.render('index', { title: 'script', user: req.session.user});
            }
            if (test) {
              data = test;
            }
        });
        res.render('index', { title: 'script', data:data, user: req.session.user, add: adds});
    });
}
execTests();

//function to find a specific test
function findTest(data, dataRandom, adds, title) {
    router.get("/tests/:id", function (req, res, next) {
        console.log(req.session.user);
        Tes.idProduct = req.params.id;
            Test.findOne({"_id": req.params.id}, function (err, test) {
                if (err) {
                    title = "لا يوجد اختبار"
                    req.flash("error", "لا يوجد اختبار");
                    return res.render("test", {
                        error: req.flash("error"),
                        success: req.flash("success"),
                        title: title,
                        add: adds,
                    });
                }
                if (test) {
                    title = test.testTitle;
                    data = test;

                }
            });
            Adds.findOne({"addNumber": 2}, function (err, add) {
                if (err) {
                    return res.render("test", {
                        data: data,
                        random: dataRandom,
                        title: title,
                        user: req.session.user,
                        notResult: "not",
                        notUser: !req.session.user
                    });
                }
                if (add) {
                    adds = add;
                }
            });
            Test.aggregate([{$sample: {size: 10}}], function (err, random) {
                if (err) {
                    return res.render("test", {
                        data: data,
                        add: adds,
                        title: title,
                        user: req.session.user,
                        notResult: "not",
                        notUser: !req.session.user
                    });
                }
                if (random) {
                    dataRandom = random;
                }
            });
            res.render("test", {
                data: data,
                random: dataRandom,
                title: title,
                add: adds,
                user: req.session.user,
                notResult: "not",
                notUser: !req.session.user
            });
        });
}
findTest();
function findTestResult(data, dataRandom, adds, title) {
    router.get("/tests/result/:id", function (req, res, next) {
        console.log(req.session.user);
        Tes.idProduct = req.params.id;
        Tes.idProduct = req.params.id;
        Test.findOne({"_id": req.params.id}, function (err, test) {
            if (err) {
                title = "لا يوجد اختبار";
                req.flash("error", "لا يوجد اختبار");
                return res.render("test", {
                    error: req.flash("error"),
                    success: req.flash("success"),
                    title: title,
                    add: adds,

                });
            }
            if (test) {
                title = test.testTitle;
                data = test;

            }
        });
        Adds.findOne({"addNumber": 2}, function (err, add) {
            if (err) {
                return res.render("test", {
                    data: data,
                    random: dataRandom,
                    title: title,
                    user: req.session.user,
                    testResult: "not",
                    notUser: !req.session.user
                });
            }
            if (add) {
                adds = add;
            }
        });
        Test.aggregate([{$sample: {size: 10}}], function (err, random) {
            if (err) {
                return res.render("test", {
                    data: data,
                    add: adds,
                    title: title,
                    user: req.session.user,
                    testResult: "not",
                    notUser: !req.session.user
                });
            }
            if (random) {
                dataRandom = random;
            }
        });
        res.render("test", {
            data: data,
            random: dataRandom,
            title: title,
            add: adds,
            user: req.session.user,
            testResult: "not",
            notUser: !req.session.user
        });
    });
}

findTestResult();
function findCategories(data, adds) {
    router.get("/:category", function (req, res, next) {
        Adds.findOne({"addNumber": 1}, function (err, add) {
            if (err) {
                return res.render('categories', { title: 'script', user: req.session.user, data: data});
            }
            if (add) {
                adds = add;
            }
        });
        Test.find({"testCategory": req.params.category}).sort("-testDate").exec(function (err, test) {
            if (err) {
                console.log(err);
                return res.render('categories', { title: 'script', user: req.session.user});
            }
            if (test) {
                data = test;
            }
        });
        res.render('categories', { title: 'script', data:data, user: req.session.user, add: adds});
    });
}
findCategories();
module.exports = router;
