const Book = require('./Book.model');
const Author = require('./Author.model');

module.exports = (sequelize, Sequelize) => {
    const BookAuthor = sequelize.define(
        'BookAuthor',
        {},
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // chỉ định tên table
        },
    );

    return BookAuthor;
};
