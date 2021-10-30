const dbConfig = require('../app/config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.author = require('./Author.model')(sequelize, Sequelize);
db.book = require('./Book.model')(sequelize, Sequelize);
db.cart = require('./Cart.model')(sequelize, Sequelize);
db.category = require('./Category.model')(sequelize, Sequelize);
db.customer = require('./Customer.model')(sequelize, Sequelize);
db.discount = require('./Discount.model')(sequelize, Sequelize);
db.image = require('./Image.model')(sequelize, Sequelize);
db.manager = require('./Manager.model')(sequelize, Sequelize);
db.order = require('./Order.model')(sequelize, Sequelize);
db.publisher = require('./Publisher.model')(sequelize, Sequelize);
db.rate = require('./Rate.model')(sequelize, Sequelize);
db.translator = require('./Translator.model')(sequelize, Sequelize);

// Relationship table
db.bookTranslator = require('./BookTranslator.model')(sequelize, Sequelize);
db.bookAuthor = require('./BookAuthor.model')(sequelize, Sequelize);
db.bookCategory = require('./BookCategory.model')(sequelize, Sequelize);
db.bookDiscountCode = require('./BookDiscountCode.model')(sequelize, Sequelize);
db.bookOrder = require('./BookOrder.model')(sequelize, Sequelize);
db.bookCart = require('./BookCart.model')(sequelize, Sequelize);

// Relationship
// Book - Translator
db.book.belongsToMany(db.translator, { through: db.bookTranslator });
db.translator.belongsToMany(db.book, { through: db.bookTranslator });

// Book - Author
db.book.belongsToMany(db.author, { through: db.bookAuthor });
db.author.belongsToMany(db.book, { through: db.bookAuthor });

// Book - Category
db.book.belongsToMany(db.category, { through: db.bookCategory });
db.category.belongsToMany(db.book, { through: db.bookCategory });

// Book - Image
db.book.hasMany(db.image, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
db.image.belongsTo(db.book);

// Book - Publisher
db.publisher.hasMany(db.book, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});
db.book.belongsTo(db.publisher);

// Book - Discount
db.book.belongsToMany(db.discount, { through: db.bookDiscountCode });
db.discount.belongsToMany(db.book, { through: db.bookDiscountCode });

// Book - Order
db.book.belongsToMany(db.order, { through: db.bookOrder });
db.order.belongsToMany(db.book, { through: db.bookOrder });

// Book - Cart
db.book.belongsToMany(db.cart, { through: db.bookCart });
db.cart.belongsToMany(db.book, { through: db.bookCart });

// Book - Rate
db.book.hasMany(db.rate, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
db.rate.belongsTo(db.book);

// Customer - Rate
db.customer.hasMany(db.rate, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
});
db.rate.belongsTo(db.customer);

// Customer - Order
db.customer.hasMany(db.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
db.order.belongsTo(db.customer);

// Customer - Cart
db.customer.hasOne(db.cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
db.cart.belongsTo(db.customer);

module.exports = db;
