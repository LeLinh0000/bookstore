const contactRouter = require('./contact');
const siteRouter = require('./site');
const productsRouter = require('./products');
const registerRouter = require('./register');
const detailsProductRouter = require('./detailsproduct');
const category = require('./category');
const author = require('./author');
const customer = require('./customer');
const publisher = require('./publisher');
const discount = require('./discount');
const translator = require('./translator');
const cart = require('./cart');
const rate = require('./rate');
const order = require('./order');
const image = require('./image');
const bookauthor = require('./bookauthor');
const booktranslator = require('./booktranslator');
const bookcategory = require('./bookcategory');
const bookcart = require('./bookcart');
const bookorder = require('./bookorder');
const book = require('./book');

function route(app) {
    app.use('/contact', contactRouter);

    app.use('/products', productsRouter);

    app.use('/detailsProduct', detailsProductRouter);

    app.use('/register', registerRouter);

    app.use('/api/customer', customer);

    app.use('/api/category', category);

    app.use('/api/author', author);

    app.use('/api/image', image);

    app.use('/api/rate', rate);

    app.use('/api/order', order);

    app.use('/api/translator', translator);

    app.use('/api/publisher', publisher);

    app.use('/api/discount', discount);

    app.use('/api/cart', cart);

    app.use('/api/bookauthor', bookauthor);

    app.use('/api/booktranslator', booktranslator);

    app.use('/api/bookcategory', bookcategory);

    app.use('/api/bookcart', bookcart);

    app.use('/api/bookorder', bookorder);

    app.use('/api/book', book);

    app.use('/', siteRouter);
}

module.exports = route;
