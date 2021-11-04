const db = require('../../models/index');
const Order = db.order;
const Book = db.book;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body.CustomerCustomerId) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Order
    const order = {
        CustomerCustomerId: req.body.CustomerCustomerId,
    };

    // Save Order in the database
    Order.create(order)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Order.',
            });
        });
};

// Retrieve all Order from the database.
exports.findAll = (req, res) => {
    const orderState = req.query.orderState;
    var condition = orderState ? { orderState: orderState } : null;

    Order.findAll({ where: condition, include: Book })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Order.',
            });
        });
};

// Find a single Order with an OrderId
exports.findOne = (req, res) => {
    const orderId = req.params.id;

    Order.findOne({ where: { orderId: orderId }, include: Book })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find order with orderId=${orderId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving order with orderId=' + orderId,
            });
        });
};

// Update a Order by the OrderId in the request
exports.update = (req, res) => {
    const orderId = req.params.id;

    Order.update(req.body, {
        where: { orderId: orderId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Order was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Order with orderId=${orderId}. Maybe Order was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Order with orderId=' + orderId,
            });
        });
};

// Delete a Order with the specified OrderId in the request
exports.delete = (req, res) => {
    const orderId = req.params.id;

    Order.destroy({
        where: { orderId: orderId },
    })
        .then((num) => {
            if (num != 0) {
                res.send({
                    message: 'Order was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Order with orderId=${orderId}. Maybe Order was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Order with orderId=' + orderId,
            });
        });
};

// Delete all Order from the database.
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Orders were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all Orders.',
            });
        });
};
// Find all user Order
exports.findOrdersOfCus = (req, res) => {
    Order.findAll({ where: { CustomerCustomerId: req.params.customerId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Order.',
            });
        });
};

// exports.findOrdersWithState = (req, res) => {
//     Order.findAll({ where: { comment: { [Op.ne]: null } } })
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message:
//                     err.message ||
//                     'Some error occurred while retrieving Order.',
//             });
//         });
// };
