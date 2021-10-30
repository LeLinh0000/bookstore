module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define(
        'Cart',
        {
            cartId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // chỉ định tên table
        },
    );

    return Cart;
};
