module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define(
        'Customer',
        {
            customerId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            customerName: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            birthday: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },

            gender: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            address: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: '/img/avatar/avatar.png',
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        },
    );

    return Customer;
};
