const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
// const AdminBro = require('admin-bro');
// const AdminBroExpress = require('@admin-bro/express');
// const AdminBroSequelize = require('@admin-bro/sequelize');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

const route = require('./routes');

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(flash());

app.use(
    session({
        secret: 'somesecret',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    }),
);

const db = require('./models');
db.sequelize.sync();

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
