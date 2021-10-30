module.exports = (sequelize, Sequelize) => {
    const Manager = sequelize.define(
        'Manager',
        {
            managerId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            managerName: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            userName: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: '/img/avatar/avatar.png',
            },

            permission: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        },
    );

    return Manager;
};
