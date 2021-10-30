const Book = require('./Book.model');
const Cart = require('./Cart.model');

module.exports = (sequelize, Sequelize) => {
    const BookCart = sequelize.define(
        'BookCart',
        {
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // chỉ định tên table
        },
    );

    return BookCart;
};
