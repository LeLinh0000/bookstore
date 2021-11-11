const db = require('../../models/index');
const Manager = db.manager;
const Order = db.order;
const Cart = db.cart;

const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// Create and Save a new manager
exports.create = (req, res) => {
    // Validate request
    if (
        !req.body.managerName ||
        !req.body.userName ||
        !req.body.password ||
        !req.body.email ||
        !req.body.permission
    ) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a manager
    let avatar = req.body.avatar ? req.body.avatar : '/img/avatar/avatar.png';
    let password = bcrypt.hashSync(req.body.password, 10);

    const manager = {
        managerName: req.body.managerName,
        userName: req.body.userName,
        email: req.body.email,
        permission: req.body.permission,
        password: password,
        avatar: avatar,
    };

    // Save manager in the database
    Manager.create(manager)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the manager.',
            });
        });
};

// Retrieve all manager from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { managerName: { [Op.like]: `%${name}%` } } : null;

    Manager.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving manager.',
            });
        });
};

// Find a single manager with an managerId
exports.findOne = (req, res) => {
    const managerId = req.params.id;

    Manager.findOne({
        where: { managerId: managerId },
    })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find manager with managerId=${managerId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving manager with managerId=' + managerId,
            });
        });
};

// Update a manager by the id_loaisach in the request
exports.update = (req, res) => {
    const managerId = req.params.id;

    // Create a manager
    let avatar = req.body.avatar ? req.body.avatar : '/img/avatar/avatar.png';
    let password = bcrypt.hashSync(req.body.password, 10);

    const manager = {
        managerName: req.body.managerName,
        userName: req.body.userName,
        email: req.body.email,
        permission: req.body.permission,
        password: password,
        avatar: avatar,
    };

    Manager.update(manager, {
        where: { managerId: managerId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'manager was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update manager with managerId=${managerId}. Maybe manager was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating manager with managerId=' + managerId,
            });
        });
};

// Delete a manager with the specified managerId in the request
exports.delete = (req, res) => {
    const managerId = req.params.id;

    Manager.destroy({
        where: { managerId: managerId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'manager was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete manager with managerId=${managerId}. Maybe manager was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete manager with managerId=' + managerId,
            });
        });
};

// Delete all manager from the database.
exports.deleteAll = (req, res) => {
    Manager.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} managers were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all managers.',
            });
        });
};
// Find all published manager
exports.findWithPermission = (req, res) => {
    Manager.findAll({
        where: { permission: req.params.permission },
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving manager.',
            });
        });
};
