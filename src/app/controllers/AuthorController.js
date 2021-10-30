const db = require('../../models/index');
const Author = db.author;
const Op = db.Sequelize.Op;

// Create and Save a new author
exports.create = (req, res) => {
    // Validate request
    if (!req.body.authorName) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a author
    const author = {
        authorName: req.body.authorName,
    };

    // Save author in the database
    Author.create(author)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the author.',
            });
        });
};

// Retrieve all author from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { authorName: { [Op.like]: `%${name}%` } } : null;

    Author.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving author.',
            });
        });
};

// Find a single author with an authorId
exports.findOne = (req, res) => {
    const authorId = req.params.id;

    Author.findByPk(authorId)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find author with authorId=${authorId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving author with authorId=' + authorId,
            });
        });
};

// Update a author by the id_loaisach in the request
exports.update = (req, res) => {
    const authorId = req.params.id;

    Author.update(req.body, {
        where: { authorId: authorId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'author was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update author with authorId=${authorId}. Maybe author was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating author with authorId=' + authorId,
            });
        });
};

// Delete a author with the specified authorId in the request
exports.delete = (req, res) => {
    const authorId = req.params.id;

    Author.destroy({
        where: { authorId: authorId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'author was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete author with authorId=${authorId}. Maybe author was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete author with authorId=' + authorId,
            });
        });
};

// Delete all author from the database.
exports.deleteAll = (req, res) => {
    Author.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} authors were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all authors.',
            });
        });
};
// Find all published author
exports.findAllName = (req, res) => {
    Author.findAll({ where: { authorName: req.params.name } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving author.',
            });
        });
};
