module.exports = (sequelize, Sequelize) => {
    const Discount = sequelize.define(
        'Discount',
        {
            discountId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            discountCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            minOrderValue: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },

            timeStart: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            timeEnd: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        },
    );

    return Discount;
};
