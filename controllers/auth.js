/**
 * Created by elya on 1/26/17.
 */
const User = require("../models/user").User;
let conf = require('../config/config');
const passport = require("passport");
const jwt = require('jsonwebtoken');

module.exports = {
    signupView: function (req, res) {
        res.render("signup");
    },

    signup: function (req, res,next) {
        let {username, password} = req.body;

        User.findOne({username})
            .then(function (user) {
                if (user) {
                    req.flash("error", "User already exists");
                    return res.redirect("/signup");
                }
                let newUser = new User({
                    username,
                    password
                });
                let token = jwt.sign(
                    {
                        username,
                        password
                    },
                    conf.jwtSecret,
                    {
                        expiresIn: 36000 // in seconds
                    });

                res.cookie('authorization', token);

                if(res.status(200)){
                    return newUser.save()
                }
            })
            .then(function (user) {
                // console.log(res.status(200));
                if (user) {
                    (passport.authenticate("login", {
                        successRedirect: "/",
                        failureRedirect: "/signup",
                        failureFlash: true
                    }))(req, res, next)
                }
            })
            .catch(function (err) {
                // res.json(err)
                return res.render("err", {err: err})
            });

    },

    loginView: function (req, res) {
        res.render("login");
    },

    login: function (req, res, next) {
        let {username, password} = req.body;
        let token = jwt.sign(
            {
                username,
                password
            },
            conf.jwtSecret,
            {
                expiresIn: 36000 // in seconds
            });

        res.cookie('authorization', token);

        (passport.authenticate("login", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        }))(req, res, next)
    },

    logout: function (req, res) {
        res.clearCookie("authorization");
        req.logout();
        res.redirect("/");
    }


}
