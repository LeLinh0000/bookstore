const Book = require('./Book.model');
const Category = require('./Category.model');

module.exports = (sequelize, Sequelize) => {
    const BookCategory = sequelize.define(
        'BookCategory',
        {},
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // chỉ định tên table
        },
    );

    return BookCategory;
};
