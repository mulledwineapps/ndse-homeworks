const express = require('express');

const logger = require('./middleware/logger')
const errorMiddleware = require('./middleware/error');

const userApi = require('./routes/api/user');
const booksApi = require('./routes/api/books');

const indexRender = require('./routes/render/index');
const booksRender = require('./routes/render/books');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.use(userApi, booksApi);

app.use('/', indexRender);
app.use('/books', booksRender);

app.use('/public', express.static(__dirname + '/public'));

app.use(logger, errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT);