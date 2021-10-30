const Book = require('./Book.model');
const Translator = require('./Translator.model');

module.exports = (sequelize, Sequelize) => {
    const BookTranslator = sequelize.define(
        'BookTranslator',
        {},
        {
            timestamps: false,
        },
    );

    return BookTranslator;
};
