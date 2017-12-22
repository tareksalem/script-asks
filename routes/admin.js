const express = require("express");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
var Test = require("../models/tests");
var Add = require("../models/adds");
var router = express.Router();

router.get("/login", isLoggedIn, function (req, res, next) {
    res.render("./admin/login", {
        title: "تسجيل الدخول كمدر",
        error: req.flash("error"),
        success: req.flash("success")
    })
});
//function to make route for sugnup admin
router.post("/login", isLoggedIn, passport.authenticate("local.login", {
    failureRedirect: "/admin/login",
    successRedirect: "/admin/dashboard",
    failureFlash: true
}));
router.use("/dashboard", isNotLoggedIn, function (req, res, next) {
    next();
});
router.get("/dashboard", function (req, res, next) {
    res.redirect("/admin/dashboard/addtest");
});
router.get("/dashboard/addtest", function (req, res, next) {
    res.render("./admin/dashboard", {
        layout: "adminLayout",
        error: req.flash("error"),
        success: req.flash("success"),
        user: req.user,
        addTest: "إضافة اختبار",
        title: "إضافة اختبار"
    });
});
router.post("/dashboard/addTest", function (req, res, next) {
    var storage = multer.diskStorage({
        destination: "public/uploads/tests",
        filename: function (req, file, cb) {
            cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
        }
    });
    var upload = multer({
        storage: storage,
        limits: {fileSize: 1000000},
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        }
    }).single("testImg");
    function checkFileType(file, cb) {
        //allowed file types
        let fileTypes = /jpeg|jpg|png|gif/;
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        //check mime type of image
        let mimeType = fileTypes.test(file.mimetype);
        if (mimeType && extname) {
            return cb(null, true);
        } else {
            cb("تحميل صور فقط");
        }
    }

    upload(req, res, function (err) {
        console.log(req.file);
        if (req.file == undefined) {
            req.flash("error", "لم يتم اختيار صور");
            return res.redirect("/admin/dashboard/addtest");
        }
        if (err) {
            console.log(err);
            req.flash("error", err);
            return res.redirect("/controllers/biography");
        } else {

            var newTest = new Test();
            newTest.testTitle = req.body.testTitle;
            newTest.testImg = "uploads/tests/" + req.file.filename;
            newTest.testResultTitle = req.body.testResultTitle;
            newTest.testResultDescription = req.body.testResultDescription;
            newTest.testDate = Date.now();
            newTest.testCategory = req.body.testCategory;
            newTest.save(function (err) {
                if (err) {
                    req.flash("error", "لم يتم حفظ الاختبار بنجاح حدث خطأ ما")
                    res.redirect("/admin/dashboard");
                } else {
                    req.flash("success", "تم إضافة الاختبار بنجاح");
                    res.redirect("/admin/dashboard");
                }
            });
        }


    });

});
router.get("/dashboard/addadmin", function (req, res, next) {
    res.render("./admin/dashboard", {
        layout: "adminLayout",
        error: req.flash("error"),
        success: req.flash("success"),
        user: req.user,
        addAdmin: "أضف مدير أخر",
        title: "إضافة مدير أخر"
    });
});
router.get("/dashboard/addadds", function (req, res, next) {
    res.render("./admin/dashboard", {
        layout: "adminLayout",
        error: req.flash("error"),
        success: req.flash("success"),
        user: req.user,
        addAdds: "أضف اعلان",
        title: "إضافة اعلان"
    });
});
router.post("/dashboard/addadmin", passport.authenticate("local.signup", {
    failureRedirect: "/admin/dashboard/addadmin",
    successRedirect: "/admin/dashboard/addadmin",
    failureFlash: true
}));
router.post("/dashboard/addadds", function (req, res, next) {
    var newAdd = new Add();
    newAdd.addName = req.body.addName;
    newAdd.addScript = req.body.addScript;
    newAdd.addNumber = req.body.addNumber;
    newAdd.save(function (err) {
        if (err) {
            req.flash("error", "لم يتم حفظ الاعلان بنجاخ");
            res.redirect("/admin/dashboard/addadds");
        } else {

            req.flash("success", "تم حفظ الاعلان بنجاح");
            res.redirect("/admin/dashboard/addadds");
        }
    });
});
router.get("/setting", function (req, res, next) {
    res.render("./admin/setting");
});
router.get("/logout", function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect("/");
});
//function to check if the user logeed in or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/admin/dashboard");
    } else {
        return next();
    }
}
//function to check if the user logeed in or not
function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect("/");
    } else {
        return next();
    }
}
module.exports = router;
