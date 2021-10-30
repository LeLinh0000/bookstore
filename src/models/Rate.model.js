module.exports = (sequelize, Sequelize) => {
    const Rate = sequelize.define(
        'Rate',
        {
            rateId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            rate: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 5,
            },

            comment: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // chỉ định tên table
        },
    );

    return Rate;
};
