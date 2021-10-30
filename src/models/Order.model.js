module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define(
        'Order',
        {
            orderId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            orderState: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            orderTime: {
                type: Sequelize.TIME,
                allowNull: false,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // chỉ định tên table
        },
    );

    return Order;
};
