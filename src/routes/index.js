const contactRouter = require('./contact');
const siteRouter = require('./site');
const productsRouter = require('./products');
const registerRouter = require('./register');
const data = require('./data');

function route(app) {
    app.use('/contact', contactRouter);

    app.use('/products', productsRouter);

    app.use('/register', registerRouter);

    app.use('/data', data);

    app.use('/', siteRouter);
}

module.exports = route;
