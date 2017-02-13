const Book = require("../models/book").Book;
const User = require("../models/user").User;

module.exports = {
    getAllBooks: function (req, res) {
        Book.find()
            .populate('userId')
            .sort({createdAt: "descending"})
            .then(function (books) {
                res.json(books)
                // return res.render("books", {books: books})
            })
            .catch(function (err) {
                res.json(err)
                // return res.render("err", {err: err})
            })
    },
    getMyBooks: function (req, res) {
        let user = req.user;
        Book.find({'userId':user._id})
            .populate('userId')
            .sort({createdAt: "descending"})
            .then(function (books) {
                res.json(books)
                // return res.render("books", {books: books})
            })
            .catch(function (err) {
                res.json(err)
                // return res.render("err", {err: err})
            })
    },
    create: function (req, res) {
        return res.render("createBook")
    },
    add: function (req, res, next) {
        let {userId, title, author} = req.body;
        // console.log(req.files)
        let image  = '';
        if(req.files.image){
            image = req.files.image.name
        }
        let newBook = new Book({
            userId,
            title,
            author,
            image
        });
        newBook.save();
        User.findOne({_id: userId})
            .then(function (user) {
                user.books.push(newBook);
                user.save();
            })
            .catch(function (err) {
                res.json(err)
                // return res.render("err", {err: err})
            })
        return res.redirect('/books')

    },
    show: function(req, res, next) {
        Book
            .findOne({title: req.params.title})
            .populate('userId')
            .then(function (book) {
                res.json(book)
                // return res.render("showBook", {book: book});
            })
            .catch(function (err) {
                res.json(err)
                // return res.render("err", {err: err})
            })
    },
    edit: function(req, res) {
        let editBook = Book.findOne({ title: req.params.title }, function(err, book) {
            if (err) { return next(err); }
            if (!book) { return next(404); }
            res.render("editBook", { book: book });
        });
    },
    update: function(req, res) {
        Book.findByIdAndUpdate({ _id: req.params.id }, { title: req.body.title,author : req.body.author })
            .then(function (data) {
                req.flash("info", "Book updated!");
                res.redirect("/books")
            }, function (err) {
                res.json(err)
                // console.log(err)
            })
    },
    //Not By Id Only Update
    // Book.update({ _id: req.params.id }, { $set: { title: req.body.title,author : req.body.author }})
    delete: function (req, res, next) {
        Book.findByIdAndRemove({_id:req.params.id})
            .then(function (err) {
                    req.flash("info", "Book deleted!");
                    res.redirect("/books")
                },function (err) {
                res.json(err)
                // console.log(err)
                }
            );
    },
    showByAuthor: function (req, res) {
        console.log(req.params.author)
        Book.find({'author' : req.params.author})
            .populate('userId')
            .sort({createdAt: "descending"})
            .then(function (books) {
                res.json(books)
                // return res.render("books", {books: books})
            })
            .catch(function (err) {
                res.json(err)
                // return res.render("err", {err: err})
            })
    }


}
