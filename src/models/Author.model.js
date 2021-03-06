module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define(
        'Author',
        {
            authorId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            authorName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        },
    );

    return Author;
};
