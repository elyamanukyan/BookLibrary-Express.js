const express = require("express");
const router = express.Router();
const isAuthenticate = require('../middleware/ensureauthenticated');
const Books = require("../controllers/books");
const Users = require("../controllers/users");
const Auth = require("../controllers/auth");
const multer  = require('multer');

router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

// HomeUrl route
router.get("/", Users.allUsers);

//Auth routs
router.get("/signup", Auth.signupView);
router.post("/signup", Auth.signup);
router.get("/login", Auth.loginView);
router.post("/login", Auth.login);
router.get("/logout", Auth.logout);

// User routes
router.get("/users/:id", Users.showUser);
router.get("/edit", isAuthenticate, Users.edit);
router.post("/edit", multer({ dest: './uploads/'}), isAuthenticate, Users.update);

// Book Routes
router.get("/books", Books.getAllBooks);
router.get("/myBooks", isAuthenticate, Books.getMyBooks);
router.post('/books', isAuthenticate, Books.add);
router.post("/books/deleteBook/:id", isAuthenticate, Books.delete);
router.post("/books/:id", isAuthenticate, Books.update);
router.get('/books/createBook',isAuthenticate, Books.create);
router.get("/books/editBook/:title", isAuthenticate, Books.edit);
router.get("/books/search/:author", Books.showByAuthor);
router.get("/books/:title", Books.show);

module.exports = router;