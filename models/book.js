const mongoose = require("mongoose");

let bookSchema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});


let Book = mongoose.model("Book", bookSchema);

module.exports.Book = Book;
