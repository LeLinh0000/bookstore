const db = require('../../models/index');
const Discount = db.discount;
const Op = db.Sequelize.Op;

// Create and Save a new Discount
exports.create = (req, res) => {
    // Validate request
    if (
        !req.body.discountCode ||
        !req.body.minOrderValue ||
        !req.body.timeStart ||
        !req.body.timeEnd
    ) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Discount
    const discount = {
        discountCode: req.body.discountCode,
        minOrderValue: req.body.minOrderValue,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
    };

    // Save Discount in the database
    Discount.create(discount)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Discount.',
            });
        });
};

// Retrieve all Discount from the database.
exports.findAll = (req, res) => {
    const discountCode = req.query.discountCode;
    var condition = discountCode
        ? { discountCode: { [Op.like]: `${discountCode}` } }
        : null;

    Discount.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Discount.',
            });
        });
};

// Find a single Discount with an DiscountId
exports.findOne = (req, res) => {
    const DiscountId = req.params.id;

    Discount.findByPk(DiscountId)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Discount with DiscountId=${DiscountId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error retrieving Discount with DiscountId=' + DiscountId,
            });
        });
};

// Update a Discount by the DiscountId in the request
exports.update = (req, res) => {
    const DiscountId = req.params.id;

    Discount.update(req.body, {
        where: { discountId: DiscountId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Discount was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Discount with DiscountId=${DiscountId}. Maybe Discount was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating Discount with DiscountId=' + DiscountId,
            });
        });
};

// Delete a Discount with the specified DiscountId in the request
exports.delete = (req, res) => {
    const DiscountId = req.params.id;

    Discount.destroy({
        where: { discountId: DiscountId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Discount was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Discount with DiscountId=${DiscountId}. Maybe Discount was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete Discount with DiscountId=' + DiscountId,
            });
        });
};

// Delete all Discount from the database.
exports.deleteAll = (req, res) => {
    Discount.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Discounts were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all Discounts.',
            });
        });
};
// Find all published Discount
exports.findWithCondition = (req, res) => {
    if (req.query.minValue) {
        const minOrderValue = req.query.minValue;
        console.log(minOrderValue);
        var condition = { minOrderValue: { [Op.gte]: minOrderValue } };
    } else if (req.query.timeStart) {
        const timeStart = req.query.timeStart;
        var condition = { timeStart: { [Op.gte]: `${timeStart}` } };
    }

    Discount.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Discount.',
            });
        });
};
