const Book = require('./Book.model');
const Discount = require('./Discount.model');

module.exports = (sequelize, Sequelize) => {
    const BookDiscountCode = sequelize.define(
        'BookDiscountCode',
        {},
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // chỉ định tên table
        },
    );

    return BookDiscountCode;
};
