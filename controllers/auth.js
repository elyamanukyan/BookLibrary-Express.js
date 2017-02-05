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

    signup: function (req, res) {
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

                let token = jwt.sign(newUser, conf.jwtSecret, {
                    expiresIn: 10080 // in seconds
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token
                });
                if(res.status(200)){
                    return newUser.save();
                    // console.log('aaa')
                }


                // let token = jwt.sign(newUser, conf.jwtSecret, {
                //     expiresIn: 3600000 // in seconds
                // })
                // let authUser = _.pick(newUser, '_id', 'username')
                // res.status(200).json({authUser, token})
                // next()

            })
            .then(function (user,token) {
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
                return res.render("err", {err: err})
            });

    },

    loginView: function (req, res) {
        res.render("login");
    },

    login: function (req, res, next) {
        (passport.authenticate("login", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        }))(req, res, next)
    },

    logout: function (req, res) {
        req.logout();
        res.redirect("/");
    }


}
