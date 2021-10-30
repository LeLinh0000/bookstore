const db = require('../../models/index');
const BookCategory = db.bookCategory;
const Op = db.Sequelize.Op;

// Create and Save a new BookCategory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.BookBookId || !req.body.CategoryCategoryId) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a BookCategory
    const bookCategory = {
        BookBookId: req.body.BookBookId,
        CategoryCategoryId: req.body.CategoryCategoryId,
    };

    // Save BookCategory in the database
    BookCategory.create(bookCategory)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the BookCategory.',
            });
        });
};

// Retrieve all BookCategory from the database.
exports.findAll = (req, res) => {
    const bookId = req.query.bookId;
    const categoryId = req.query.categoryId;
    var condition = bookId
        ? {
              BookBookId: { [Op.like]: `%${bookId}%` },
              CategoryCategoryId: { [Op.like]: `%${categoryId}%` },
          }
        : null;

    BookCategory.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving BookCategory.',
            });
        });
};

// Find a single BookCategory with an BookCategoryId
exports.findOneWithCategoryID = (req, res) => {
    const CategoryCategoryId = req.params.categoryId;

    BookCategory.findAll({ where: { CategoryCategoryId: CategoryCategoryId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Error retrieving BookCategory with CategoryCategoryId=' +
                        CategoryCategoryId,
            });
        });
};

exports.findOneWithBookID = (req, res) => {
    const BookBookId = req.params.bookId;

    BookCategory.findAll({ where: { BookBookId: BookBookId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Error retrieving BookCategory with BookBookId=' +
                        BookBookId,
            });
        });
};

// Update a BookCategory by the id_loaisach in the request
exports.update = (req, res) => {
    const BookBookId = req.query.bookId;
    const CategoryCategoryId = req.query.categoryId;

    BookCategory.update(req.body, {
        where: {
            BookBookId: BookBookId,
            CategoryCategoryId: CategoryCategoryId,
        },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookCategory was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update BookCategory with BookBookId=${BookBookId}, CategoryCategoryId=${CategoryCategoryId}. Maybe BookCategory was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating BookCategory with BookBookId=' +
                    BookBookId +
                    'CategoryCategoryId=' +
                    CategoryCategoryId,
            });
        });
};

// Delete a BookCategory with the specified BookCategoryId in the request
exports.delete = (req, res) => {
    const BookBookId = req.query.bookId;
    const CategoryCategoryId = req.query.categoryId;

    BookCategory.destroy({
        where: {
            BookBookId: BookBookId,
            CategoryCategoryId: CategoryCategoryId,
        },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookCategory was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete BookCategory with BookBookId=${BookBookId}, CategoryCategoryId=${CategoryCategoryId}. Maybe BookCategory was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete BookCategory with BookBookId=' +
                    BookBookId +
                    'CategoryCategoryId=' +
                    CategoryCategoryId,
            });
        });
};

// Delete all BookCategory from the database.
exports.deleteAll = (req, res) => {
    BookCategory.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} BookCategorys were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all BookCategorys.',
            });
        });
};
// // Find all published BookCategory
// exports.findAllName = (req, res) => {
//   BookCategory.findAll({ where: { BookCategoryName: req.params.name } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving BookCategory."
//         });
//       });
//   };
