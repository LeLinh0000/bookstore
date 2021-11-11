const db = require('../../models/index');
const Translator = db.translator;
const Book = db.book;
const Op = db.Sequelize.Op;

// Create and Save a new Translator
exports.create = (req, res) => {
    // Validate request
    if (!req.body.translatorName) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Translator
    const translator = {
        translatorName: req.body.translatorName,
    };

    // Save Translator in the database
    Translator.create(translator)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Translator.',
            });
        });
};

// Retrieve all Translator from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name
        ? { translatorName: { [Op.like]: `%${name}%` } }
        : null;

    Translator.findAll({ where: condition, include: Book })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving translator.',
            });
        });
};

// Find a single Translator with an TranslatorId
exports.findOne = (req, res) => {
    const translatorId = req.params.id;

    Translator.findOne({
        where: { translatorId: translatorId },
        include: Book,
    })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find translator with translatorId=${translatorId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error retrieving translator with translatorId=' +
                    translatorId,
            });
        });
};

// Update a Translator by the TranslatorId in the request
exports.update = (req, res) => {
    const TranslatorId = req.params.id;
    const translatorName = req.body.translatorName;

    const translator = {
        translatorName: translatorName,
    };

    Translator.update(translator, {
        where: { translatorId: TranslatorId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Translator was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Translator with TranslatorId=${TranslatorId}. Maybe Translator was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating Translator with TranslatorId=' +
                    TranslatorId,
            });
        });
};

// Delete a Translator with the specified TranslatorId in the request
exports.delete = (req, res) => {
    const TranslatorId = req.params.id;

    Translator.destroy({
        where: { translatorId: TranslatorId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Translator was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Translator with TranslatorId=${TranslatorId}. Maybe Translator was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete Translator with TranslatorId=' +
                    TranslatorId,
            });
        });
};

// Delete all Translator from the database.
exports.deleteAll = (req, res) => {
    Translator.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Translators were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all Translators.',
            });
        });
};
// Find all published Translator
exports.findAllName = (req, res) => {
    Translator.findAll({ where: { translatorName: req.params.name } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Translator.',
            });
        });
};
