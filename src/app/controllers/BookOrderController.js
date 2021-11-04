const db = require('../../models/index');
const BookOrder = db.bookOrder;
const Op = db.Sequelize.Op;

// Create and Save a new BookOrder
exports.create = (req, res) => {
    // Validate request
    if (!req.body.BookBookId || !req.body.OrderOrderId) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    const quantity = req.body.quantity ? req.body.quantity : 1;

    // Create a BookOrder
    const bookOrder = {
        BookBookId: req.body.BookBookId,
        OrderOrderId: req.body.OrderOrderId,
        quantity: quantity,
    };

    // Save BookOrder in the database
    BookOrder.create(bookOrder)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the BookOrder.',
            });
        });
};

// Retrieve all BookOrder from the database.
exports.findAll = (req, res) => {
    const bookId = req.query.bookId;
    const orderId = req.query.orderId;
    var condition = bookId
        ? {
              BookBookId: bookId,
              OrderOrderId: orderId,
          }
        : null;

    BookOrder.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving BookOrder.',
            });
        });
};

// Update a BookOrder by the id_loaisach in the request
exports.update = (req, res) => {
    const BookBookId = req.query.bookId;
    const OrderOrderId = req.query.orderId;

    BookOrder.update(req.body, {
        where: { BookBookId: BookBookId, OrderOrderId: OrderOrderId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookOrder was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update BookOrder with BookBookId=${BookBookId}, OrderOrderId=${OrderOrderId}. Maybe BookOrder was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating BookOrder with BookBookId=' +
                    BookBookId +
                    'OrderOrderId=' +
                    OrderOrderId,
            });
        });
};

// Delete a BookOrder with the specified BookOrderId in the request
exports.delete = (req, res) => {
    const BookBookId = req.query.bookId;
    const OrderOrderId = req.query.orderId;

    BookOrder.destroy({
        where: { BookBookId: BookBookId, OrderOrderId: OrderOrderId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookOrder was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete BookOrder with BookBookId=${BookBookId}, OrderOrderId=${OrderOrderId}. Maybe BookOrder was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete BookOrder with BookBookId=' +
                    BookBookId +
                    'OrderOrderId=' +
                    OrderOrderId,
            });
        });
};

// Delete all BookOrder from the database.
exports.deleteAll = (req, res) => {
    BookOrder.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} BookOrders were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all BookOrders.',
            });
        });
};
