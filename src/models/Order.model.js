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
                defaultValue: 'Đang xử lý',
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
