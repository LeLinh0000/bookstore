const db = require('../../models/index');
const Customer = db.customer;
const Order = db.order;
const Cart = db.cart;

const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (
        !req.body.customerName ||
        !req.body.birthday ||
        !req.body.gender ||
        !req.body.address ||
        !req.body.email ||
        !req.body.phoneNumber ||
        !req.body.password
    ) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Customer
    let avatar = req.body.avatar
        ? '/img/avatar/' + req.body.avatar
        : '/img/avatar/avatar.png';
    let password = bcrypt.hashSync(req.body.password, 10);

    const customer = {
        customerName: req.body.customerName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        address: req.body.address,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: password,
        avatar: avatar,
    };

    // Save Customer in the database
    Customer.create(customer)
        .then((data) => {
            const cart = {
                CustomerCustomerId: data.customerId,
            };
            Cart.create(cart);
            req.flash('registerSuccess', 'Chuyển hướng đăng nhập');
            res.redirect('/');
            res.send(data);
            document.querySelector('#login-form').style.display = 'block';
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Customer.',
            });
        });
};

// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { customerName: { [Op.like]: `%${name}%` } } : null;

    Customer.findAll({ where: condition, include: [Order, Cart] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Customer.',
            });
        });
};

// Find a single Customer with an customerId
exports.findOneId = (req, res) => {
    const customerId = req.params.id;

    Customer.findOne({
        where: { customerId: customerId },
        include: [Order, Cart],
    })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find customer with customerId=${customerId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error retrieving customer with customerId=' + customerId,
            });
        });
};

// Update a Customer by the id_loaisach in the request
exports.update = (req, res) => {
    const customerId = req.params.id;

    // Create a Customer
    let avatar = req.body.avatar ? req.body.avatar : '/img/avatar/avatar.png';
    let password = bcrypt.hashSync(req.body.password, 10);

    const customer = {
        customerName: req.body.customerName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        address: req.body.episode,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: password,
        avatar: avatar,
    };

    Customer.update(customer, {
        where: { customerId: customerId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Customer was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Customer with customerId=${customerId}. Maybe Customer was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating Customer with customerId=' + customerId,
            });
        });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    const customerId = req.params.id;

    Customer.destroy({
        where: { customerId: customerId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Customer was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with customerId=${customerId}. Maybe Customer was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete Customer with customerId=' + customerId,
            });
        });
};

// Delete all Customer from the database.
exports.deleteAll = (req, res) => {
    Customer.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Customers were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all Customers.',
            });
        });
};
// Find all published Customer
exports.findWithEmail = (req, res) => {
    Customer.findAll({
        where: { email: req.params.email },
        include: [Order, Cart],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Customer.',
            });
        });
};

exports.findWithEmailB = (req, res) => {
    Customer.findAll({
        where: { email: req.body.email },
        include: [Order, Cart],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Customer.',
            });
        });
};
