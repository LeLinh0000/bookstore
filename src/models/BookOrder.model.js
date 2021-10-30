const Book = require('./Book.model');
const Order = require('./Order.model');

module.exports = (sequelize, Sequelize) => {
    const BookOrder = sequelize.define(
        'BookOrder',
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

    return BookOrder;
};
