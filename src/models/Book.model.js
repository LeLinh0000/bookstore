module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define(
        'Book',
        {
            bookId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            bookName: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            coverPrice: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },

            price: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },

            episode: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: null,
            },

            language: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            bookSize: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            quantityOfPage: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            weight: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            bookLayout: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'Bìa mềm',
            },

            publishYear: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            coverImage: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        },
    );

    return Book;
};
