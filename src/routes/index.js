const contactRouter = require('./contact');
const siteRouter = require('./site');
const productsRouter = require('./products');
const registerRouter = require('./register');
const category = require('./category');
const author = require('./author');
const publisher = require('./publisher');
const discount = require('./discount');
const translator = require('./translator');
const image = require('./image');
const bookauthor = require('./bookauthor');
const booktranslator = require('./booktranslator');
const bookcategory = require('./bookcategory');
const book = require('./book');

function route(app) {
    app.use('/contact', contactRouter);

    app.use('/products', productsRouter);

    app.use('/register', registerRouter);

    app.use('/api/category', category);

    app.use('/api/author', author);

    app.use('/api/image', image);

    app.use('/api/translator', translator);

    app.use('/api/publisher', publisher);

    app.use('/api/discount', discount);

    app.use('/api/bookauthor', bookauthor);

    app.use('/api/booktranslator', booktranslator);

    app.use('/api/bookcategory', bookcategory);

    app.use('/api/book', book);

    app.use('/', siteRouter);
}

module.exports = route;
