const db = require('../../models/index');
const BookTranslator = db.bookTranslator;
const Op = db.Sequelize.Op;

// Create and Save a new BookTranslator
exports.create = (req, res) => {
    // Validate request
    if (!req.body.BookBookId || !req.body.TranslatorTranslatorId) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a BookTranslator
    const bookTranslator = {
        BookBookId: req.body.BookBookId,
        TranslatorTranslatorId: req.body.TranslatorTranslatorId,
    };

    // Save BookTranslator in the database
    BookTranslator.create(bookTranslator)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the BookTranslator.',
            });
        });
};

// Retrieve all BookTranslator from the database.
exports.findAll = (req, res) => {
    const bookId = req.query.bookId;
    const translatorId = req.query.translatorId;
    var condition = bookId
        ? {
              BookBookId: { [Op.like]: `%${bookId}%` },
              TranslatorTranslatorId: { [Op.like]: `%${translatorId}%` },
          }
        : null;

    BookTranslator.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving BookTranslator.',
            });
        });
};

// Find a single BookTranslator with an BookTranslatorId
exports.findOneWithTranslatorID = (req, res) => {
    const TranslatorId = req.params.TranslatorId;

    BookTranslator.findAll({ where: { TranslatorTranslatorId: TranslatorId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Error retrieving BookTranslator with TranslatorTranslatorId=' +
                        TranslatorId,
            });
        });
};

exports.findOneWithBookID = (req, res) => {
    const BookBookId = req.params.bookId;

    BookTranslator.findAll({ where: { BookBookId: BookBookId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Error retrieving BookTranslator with BookBookId=' +
                        BookBookId,
            });
        });
};

// Update a BookTranslator by the id_loaisach in the request
exports.update = (req, res) => {
    const BookBookId = req.query.bookId;
    const TranslatorTranslatorId = req.query.translatorId;

    BookTranslator.update(req.body, {
        where: {
            BookBookId: BookBookId,
            TranslatorTranslatorId: TranslatorTranslatorId,
        },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookTranslator was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update BookTranslator with BookBookId=${BookBookId}, TranslatorTranslatorId=${TranslatorTranslatorId}. Maybe BookTranslator was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating BookTranslator with BookBookId=' +
                    BookBookId +
                    'TranslatorTranslatorId=' +
                    TranslatorTranslatorId,
            });
        });
};

// Delete a BookTranslator with the specified BookTranslatorTranslatorId in the request
exports.delete = (req, res) => {
    const BookBookId = req.query.bookId;
    const TranslatorTranslatorId = req.query.translatorId;

    BookTranslator.destroy({
        where: {
            BookBookId: BookBookId,
            TranslatorTranslatorId: TranslatorTranslatorId,
        },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookTranslator was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete BookTranslator with BookBookId=${BookBookId}, TranslatorTranslatorId=${TranslatorTranslatorId}. Maybe BookTranslator was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete BookTranslator with BookBookId=' +
                    BookBookId +
                    'TranslatorTranslatorId=' +
                    TranslatorTranslatorId,
            });
        });
};

// Delete all BookTranslator from the database.
exports.deleteAll = (req, res) => {
    BookTranslator.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} BookTranslators were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all BookTranslators.',
            });
        });
};
// // Find all published BookTranslator
// exports.findAllName = (req, res) => {
//   BookTranslator.findAll({ where: { BookTranslatorName: req.params.name } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving BookTranslator."
//         });
//       });
//   };
