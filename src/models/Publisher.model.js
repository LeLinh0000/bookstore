module.exports = (sequelize, Sequelize) => {
    const Publisher = sequelize.define(
        'Publisher',
        {
            publisherId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            publisherName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        },
    );

    return Publisher;
};
