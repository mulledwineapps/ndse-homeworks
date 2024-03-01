const express = require('express')
const router = express.Router()

var book = require("../../book");
var cache = require("../../cache");

router.get('/', (req, res) => {
    const { books } = cache;
    res.render('books/index', {
        title: "Список книг",
        books: books,
    });
});

router.get('/books/create', (req, res) => {
    res.render("books/create", {
        title: "book | create",
        book: {},
    });
});

router.post('/books/create', (req, res) => {
    const { books } = cache;
    const {
        title, description, authors, favorite, fileCover, fileName
    } = req.body;

    const newBook = new book(
        title, description, authors, favorite, fileCover, fileName,
    );
    books.push(newBook);

    res.redirect(`/books/${newBook.id}`);
});

router.get('/books/:id', (req, res) => {
    const { books } = cache;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    res.render("books/view", {
        title: "book | view",
        book: books[idx],
    });

});

router.get('/books/update/:id', (req, res) => {
    const { books } = cache;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    res.render("books/update", {
        title: "book | update",
        book: books[idx],
    });
});

router.post('/books/update/:id', (req, res) => {
    const { books } = cache;
    const { id } = req.params;
    const {
        title, description, authors, favorite, fileCover, fileName
    } = req.body;

    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }
    
    books[idx] = {
        ...books[idx], title, description, authors, favorite, fileCover, fileName
    };
    res.redirect(`/books/${id}`);
});

router.post('/books/delete/:id', (req, res) => {
    const { books } = cache;
    const { id } = req.params;

    const idx = books.findIndex(el => el.id === id);

    if (idx === -1) {
        res.redirect('/404');
    }

    books.splice(idx, 1);
    res.redirect('/');
});

module.exports = router;