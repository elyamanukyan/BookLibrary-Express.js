const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const Book = require("../models/book").Book;

let SALT_FACTOR = 10;

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    displayname: String,
    bio: String,
    image: String,
    // books : {
    //     type: Schema.ObjectId,
    //     ref: 'Book'
    // }
    books : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

let noop = function() {};

userSchema.pre("save", function(done) {
    let user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, noop,
        function(err, hashedPassword) {
            if (err) { return done(err); }
            user.password = hashedPassword;
            done();
        });
    });
});

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

userSchema.methods.name = function() {
    return this.displayname || this.username;
};

let User = mongoose.model("User", userSchema);
// let Book = mongoose.model("Book", bookSchema);

module.exports.User = User;