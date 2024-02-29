const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/file')

var path = require("path")

var book = require("../book");

const library = {
    books: [
        new book(),
        new book(),
    ],
};

router.get('/api/books', (req, res) => {
    const { books } = library;
    res.json(books);
});

router.get('/api/books/:id', (req, res) => {
    const { books } = library;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});

router.get('/api/books/:id/download', (req, res, next) => {
    const { books } = library;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {

        var options = {
            root: path.join(__dirname, '..')
        }

        const filePath = books[idx].fileBook

        if (filePath.length === 0) {
            res.status(404);
            res.json('404 | нет файла для данной книги');
        } else {
            var options = { root: path.join(__dirname, '..') }
            
            // https://expressjs.com/en/api.html#res.sendFile
            res.sendFile(filePath, options, function (err) {
                if (err) {
                    // Error No Entity
                    if (err.code === 'ENOENT') {
                        res.json('404 | указанный файл не существует');
                        next(err)
                    }
                }
            });
        }

    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});

router.post('/api/books',
    fileMulter.single('fileBook'),
    (req, res) => {
        const { books } = library;
        const {
            title, description, authors, favorite, fileCover, fileName
        } = req.body;

        const fileBook = req.file ? req.file.path : ""

        const newBook = new Book(
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook
        );
        books.push(newBook);

        res.status(201);
        res.json(newBook);
    });

router.put('/api/books/:id',
    fileMulter.single('fileBook'),
    (req, res) => {
        const { books } = library;
        const { id } = req.params;
        const {
            title, description, authors, favorite, fileCover, fileName
        } = req.body;

        const fileBook = req.file ? req.file.path : ""

        const idx = books.findIndex(el => el.id === id)

        if (idx !== -1) {
            books[idx] = {
                ...books[idx],
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName,
                fileBook
            };

            res.json(books[idx]);
        } else {
            res.status(404);
            res.json('404 | книга не найдена');
        }
    });

router.delete('/api/books/:id', (req, res) => {
    const { books } = library;
    const { id } = req.params;

    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        books.splice(idx, 1);
        res.send('ok')
    } else {
        res.status(404);
        res.json('404 | книга не найдена');
    }
});

module.exports = router;