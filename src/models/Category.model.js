module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define(
        'Category',
        {
            categoryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            categoryName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // chỉ định tên table
        },
    );

    return Category;
};
