const express = require('express');

const logger = require('./middleware/logger')
const userApi = require('./routes/api/user');
const booksApi = require('./routes/api/books');
const booksRender = require('./routes/render/books');

const app = express();

app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.use(express.json());
app.use(logger);

app.use('/public', express.static(__dirname + '/public'));
app.use(userApi, booksApi, booksRender);

const PORT = process.env.PORT || 3000;
app.listen(PORT);