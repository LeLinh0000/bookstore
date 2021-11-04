const db = require('../../models/index');
const Publisher = db.publisher;
const Book = db.book;
const Op = db.Sequelize.Op;

// Create and Save a new publisher
exports.create = (req, res) => {
    // Validate request
    if (!req.body.publisherName) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a publisher
    const publisher = {
        publisherName: req.body.publisherName,
    };

    // Save publisher in the database
    Publisher.create(publisher)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the publisher.',
            });
        });
};

// Retrieve all publisher from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { publisherName: { [Op.like]: `%${name}%` } } : null;

    Publisher.findAll({ where: condition, include: Book })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Publisher.',
            });
        });
};

// Find a single publisher with an publisherId
exports.findOne = (req, res) => {
    const publisherId = req.params.id;

    Publisher.findOne({
        where: { publisherId: publisherId },
        include: Book,
    })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find publisher with publisherId=${publisherId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error retrieving publisher with publisherId=' +
                    publisherId,
            });
        });
};

// Update a publisher by the id_loaisach in the request
exports.update = (req, res) => {
    const publisherId = req.params.id;

    Publisher.update(req.body, {
        where: { publisherId: publisherId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'publisher was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update publisher with publisherId=${publisherId}. Maybe publisher was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating publisher with publisherId=' + publisherId,
            });
        });
};

// Delete a publisher with the specified publisherId in the request
exports.delete = (req, res) => {
    const publisherId = req.params.id;

    Publisher.destroy({
        where: { publisherId: publisherId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'publisher was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete publisher with publisherId=${publisherId}. Maybe publisher was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete publisher with publisherId=' +
                    publisherId,
            });
        });
};

// Delete all publisher from the database.
exports.deleteAll = (req, res) => {
    Publisher.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} publishers were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all publishers.',
            });
        });
};
// Find all published publisher
exports.findAllName = (req, res) => {
    Publisher.findAll({ where: { publisherName: req.params.name } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving publisher.',
            });
        });
};
