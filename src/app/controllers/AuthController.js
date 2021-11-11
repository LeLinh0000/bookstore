const db = require('../../models/index');
const Author = db.author;
const Book = db.book;
const Customer = db.customer;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// Log in
exports.login = (req, res) => {
    const email = req.body.email;
    // const password = bcrypt.hashSync(req.body.password, 2);

    Customer.findOne({
        where: { email: email },
    })
        .then((data) => {
            if (data) {
                if (data.password === req.body.password) {
                    req.session.userId = data.customerId;
                    req.session.userName = data.customerName;
                    req.session.userAvatar = data.avatar;
                    res.redirect('/');
                }
            } else {
                req.flash('error', 'Email hoặc mật khẩu sai');
                //
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving customer with email=' + email,
            });
        });
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

// Update a author by the id_loaisach in the request
exports.update = (req, res) => {
    const authorId = req.params.id;
    const authorName = req.body.authorName;

    const author = {
        authorName: authorName,
    };
    Author.update(author, {
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
