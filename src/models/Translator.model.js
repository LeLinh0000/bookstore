module.exports = (sequelize, Sequelize) => {
    const Translator = sequelize.define(
        'Translator',
        {
            translatorId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            translatorName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            // Không tự động thêm timestamp attributes (updatedAt, createdAt)
            timestamps: false,
        },
    );

    return Translator;
};
