const Book = require("../models/book").Book;
const User = require("../models/user").User;
const passport = require("passport");

module.exports = {

    allUsers: function (req, res) {
        User.find()
            .sort({createdAt: "descending"})
            .then(function (users) {
                // res.json(users)
                // res.status(200).json(users);
                return res.render("index", {users: users})
            })
            .catch(function (err) {
                // res.json(err)
                return res.render("err", {err: err})
            })
    },

    showUser: function (req, res, next) {
        User.findOne({_id: req.params.id})
        .populate('books')
            .then(function (user) {
                // res.json(user)
                return res.render("profile", {user: user});
            })
            .catch(function (err) {
                // res.json(err)
                return res.render("err", {err: err})
            })
    },

    edit: function (req, res) {
        res.render("edit");
    },

    update: function (req, res) {

        // console.log(req.files.image.name)
        User.findByIdAndUpdate({_id: req.user.id}, {
            image: req.files.image.name,
            displayname: req.body.displayname,
            bio: req.body.bio

        })
            .then(function (data) {
                req.flash("info", "Profile updated!");
                res.redirect("/")
            }, function (err) {
                // res.json(err)
                console.log(err)
            })
    },

}
