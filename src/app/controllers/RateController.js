const db = require('../../models/index');
const Rate = db.rate;
const Op = db.Sequelize.Op;

// Create and Save a new Rate
exports.create = (req, res) => {
    // Validate request
    if (
        !req.body.rate ||
        !req.body.BookBookId ||
        !req.body.CustomerCustomerId
    ) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    const comment = req.body.comment ? req.body.comment : null;

    // Create a Rate
    const rate = {
        rate: req.body.rate,
        comment: comment,
        BookBookId: req.body.BookBookId,
        CustomerCustomerId: req.body.CustomerCustomerId,
    };

    // Save Rate in the database
    Rate.create(rate)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Rate.',
            });
        });
};

// Retrieve all Rate from the database.
exports.findAll = (req, res) => {
    const rate = req.query.rate;
    var condition = rate ? { rate: rate } : null;

    Rate.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Rate.',
            });
        });
};

// Find a single Rate with an RateId
exports.findOne = (req, res) => {
    const rateId = req.params.rateId;

    Rate.findByPk(rateId)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Rate with rateId=${rateId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Rate with rateId=' + rateId,
            });
        });
};

// Update a Rate by the RateId in the request
exports.update = (req, res) => {
    const rateId = req.params.id;

    Rate.update(req.body, {
        where: { rateId: rateId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Rate was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Rate with rateId=${rateId}. Maybe Rate was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Rate with rateId=' + rateId,
            });
        });
};

// Delete a Rate with the specified rateId in the request
exports.delete = (req, res) => {
    const rateId = req.params.id;

    Rate.destroy({
        where: { rateId: rateId },
    })
        .then((num) => {
            if (num != 0) {
                res.send({
                    message: 'Rate was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Rate with rateId=${rateId}. Maybe Rate was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Rate with rateId=' + rateId,
            });
        });
};

// Delete all Rate from the database.
exports.deleteAll = (req, res) => {
    Rate.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Rates were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all Rates.',
            });
        });
};
// Find all user Rate
exports.findRatesOfCus = (req, res) => {
    Rate.findAll({ where: { CustomerCustomerId: req.params.customerId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Rate.',
            });
        });
};

exports.findRatesHaveCmt = (req, res) => {
    Rate.findAll({ where: { comment: { [Op.ne]: null } } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Rate.',
            });
        });
};
