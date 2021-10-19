const contactRouter = require('./contact');
const siteRouter = require('./site');
const productsRouter = require('./products');
const registerRouter = require('./register');

function route(app) {
    app.use('/contact', contactRouter);

    app.use('/products', productsRouter);

    app.use('/register', registerRouter);

    app.use('/', siteRouter);
}

module.exports = route;
