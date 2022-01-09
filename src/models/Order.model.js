module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define(
        'Order',
        {
            orderId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            payments: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            orderState: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: true,
            // chỉ định tên table
        },
    );

    return Order;
};
