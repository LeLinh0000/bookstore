const db = require('../../models/index');
const Cart = db.cart;
const Book = db.book;

// Create and Save a new Cart
exports.create = (req, res) => {
    // Validate request
    if (!req.body.CustomerCustomerId) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Cart
    const cart = {
        CustomerCustomerId: req.body.CustomerCustomerId,
    };

    // Save Cart in the database
    Cart.create(cart)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Cart.',
            });
        });
};

// Retrieve all Cart from the database.
exports.findAll = (req, res) => {
    const cartId = req.query.cartId;
    var condition = cartId ? { cartId: cartId } : null;

    Cart.findAll({ where: condition, include: Book })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Cart.',
            });
        });
};

// Find a single Cart with an CartId
exports.findOne = (req, res) => {
    const cartId = req.query.customerId;

    Cart.findOne({
        where: { cartId: cartId },
        include: Book,
    })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find cart with cartId=${cartId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving cart with cartId=' + cartId,
            });
        });
};

// Update a Cart by the CartId in the request
exports.update = (req, res) => {
    const cartId = req.params.id;

    Cart.update(req.body, {
        where: { cartId: cartId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Cart was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Cart with cartId=${cartId}. Maybe Cart was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Cart with customerId=' + customerId,
            });
        });
};

// Delete a Cart with the specified CartId in the request
exports.delete = (req, res) => {
    const customerId = req.params.id;

    Cart.destroy({
        where: { CustomerCustomerId: customerId },
    })
        .then((num) => {
            if (num != 0) {
                res.send({
                    message: 'Cart was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Cart with customerId=${customerId}. Maybe Cart was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Cart with CartId=' + customerId,
            });
        });
};

// Delete all Cart from the database.
exports.deleteAll = (req, res) => {
    Cart.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Carts were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all Carts.',
            });
        });
};
