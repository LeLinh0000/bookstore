const db = require('../../models/index');
const Category = db.category;
const Book = db.book;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if (!req.body.categoryName) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Category
    const category = {
        categoryName: req.body.categoryName,
    };

    // Save Category in the database
    Category.create(category)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Category.',
            });
        });
};

// Retrieve all Category from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { categoryName: { [Op.like]: `%${name}%` } } : null;

    Category.findAll({ where: condition, include: Book })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Category.',
            });
        });
};

// Find a single Category with an categoryId
exports.findOne = (req, res) => {
    const categoryId = req.params.id;

    Category.findOne({
        where: {
            categoryId: categoryId,
        },
        include: Book,
    })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Category with categoryId=${categoryId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error retrieving Category with categoryId=' + categoryId,
            });
        });
};

// Update a Category by the categoryId in the request
exports.update = (req, res) => {
    const categoryId = req.params.id;
    const categoryName = req.body.categoryName;

    const category = {
        categoryName: categoryName,
    };

    Category.update(category, {
        where: { categoryId: categoryId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Category was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Category with categoryId=${categoryId}. Maybe Category was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating Category with categoryId=' + categoryId,
            });
        });
};

// Delete a Category with the specified categoryId in the request
exports.delete = (req, res) => {
    const categoryId = req.params.id;

    Category.destroy({
        where: { categoryId: categoryId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Category was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Category with categoryId=${categoryId}. Maybe Category was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete Category with categoryId=' + categoryId,
            });
        });
};

// Delete all Category from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Categorys were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all Categorys.',
            });
        });
};
// Find all published Category
exports.findAllName = (req, res) => {
    Category.findAll({
        where: { categoryName: req.params.name },
        include: Book,
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Category.',
            });
        });
};
