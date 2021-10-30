const contactRouter = require('./contact');
const siteRouter = require('./site');
const productsRouter = require('./products');
const registerRouter = require('./register');
const category = require('./category');
const author = require('./author');
const publisher = require('./publisher');
const bookauthor = require('./bookauthor');
const booktranslator = require('./booktranslator');
const book = require('./book');

function route(app) {
    app.use('/contact', contactRouter);

    app.use('/products', productsRouter);

    app.use('/register', registerRouter);

    app.use('/api/category', category);

    app.use('/api/author', author);

    app.use('/api/publisher', publisher);

    app.use('/api/bookauthor', bookauthor);

    app.use('/api/booktranslator', booktranslator);

    app.use('/api/book', book);

    app.use('/', siteRouter);
}

module.exports = route;
