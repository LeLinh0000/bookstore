const db = require('../../models/index');
const BookCart = db.bookCart;
const Op = db.Sequelize.Op;

// Create and Save a new BookCart
exports.create = (req, res) => {
    // Validate request
    if (!req.body.BookBookId || !req.body.CartCartId) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    const quantity = req.body.quantity ? req.body.quantity : 1;

    // Create a BookCart
    const bookCart = {
        BookBookId: req.body.BookBookId,
        CartCartId: req.body.CartCartId,
        quantity: quantity,
    };

    // Save BookCart in the database
    BookCart.create(bookCart)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the BookCart.',
            });
        });
};

// Retrieve all BookCart from the database.
exports.findAll = (req, res) => {
    const bookId = req.query.bookId;
    const cartId = req.query.cartId;
    var condition = bookId
        ? {
              BookBookId: bookId,
              CartCartId: cartId,
          }
        : null;

    BookCart.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving BookCart.',
            });
        });
};

// Update a BookCart by the id_loaisach in the request
exports.update = (req, res) => {
    const BookBookId = req.query.bookId;
    const CartCartId = req.query.cartId;

    BookCart.update(req.body, {
        where: { BookBookId: BookBookId, CartCartId: CartCartId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookCart was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update BookCart with BookBookId=${BookBookId}, CartCartId=${CartCartId}. Maybe BookCart was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating BookCart with BookBookId=' +
                    BookBookId +
                    'CartCartId=' +
                    CartCartId,
            });
        });
};

// Delete a BookCart with the specified BookCartId in the request
exports.delete = (req, res) => {
    const BookBookId = req.query.bookId;
    const CartCartId = req.query.cartId;

    BookCart.destroy({
        where: { BookBookId: BookBookId, CartCartId: CartCartId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookCart was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete BookCart with BookBookId=${BookBookId}, CartCartId=${CartCartId}. Maybe BookCart was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete BookCart with BookBookId=' +
                    BookBookId +
                    'CartCartId=' +
                    CartCartId,
            });
        });
};

// Delete all BookCart from the database.
exports.deleteAll = (req, res) => {
    BookCart.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} BookCarts were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all BookCarts.',
            });
        });
};
