const db = require('../../models/index');
const BookAuthor = db.bookAuthor;
const Op = db.Sequelize.Op;

// Create and Save a new BookAuthor
exports.create = (req, res) => {
    // Validate request
    if (!req.body.BookBookId || !req.body.AuthorAuthorId) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a BookAuthor
    const bookauthor = {
        BookBookId: req.body.BookBookId,
        AuthorAuthorId: req.body.AuthorAuthorId,
    };

    // Save BookAuthor in the database
    BookAuthor.create(bookauthor)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the BookAuthor.',
            });
        });
};

// Retrieve all BookAuthor from the database.
exports.findAll = (req, res) => {
    const bookId = req.query.bookId;
    const authorId = req.query.authorId;
    var condition = bookId
        ? {
              BookBookId: { [Op.like]: `%${bookId}%` },
              AuthorAuthorId: { [Op.like]: `%${authorId}%` },
          }
        : null;

    BookAuthor.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving BookAuthor.',
            });
        });
};

// Find a single BookAuthor with an BookAuthorId
exports.findOneWithAuthorID = (req, res) => {
    const AuthorAuthorId = req.params.authorId;

    BookAuthor.findAll({ where: { AuthorAuthorId: AuthorAuthorId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Error retrieving BookAuthor with AuthorAuthorId=' +
                        AuthorAuthorId,
            });
        });
};

exports.findOneWithBookID = (req, res) => {
    const BookBookId = req.params.bookId;

    BookAuthor.findAll({ where: { BookBookId: BookBookId } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Error retrieving BookAuthor with BookBookId=' + BookBookId,
            });
        });
};

// Update a BookAuthor by the id_loaisach in the request
exports.update = (req, res) => {
    const BookBookId = req.query.bookId;
    const AuthorAuthorId = req.query.authorId;

    BookAuthor.update(req.body, {
        where: { BookBookId: BookBookId, AuthorAuthorId: AuthorAuthorId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookAuthor was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update BookAuthor with BookBookId=${BookBookId}, AuthorAuthorId=${AuthorAuthorId}. Maybe BookAuthor was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating BookAuthor with BookBookId=' +
                    BookBookId +
                    'AuthorAuthorId=' +
                    AuthorAuthorId,
            });
        });
};

// Delete a BookAuthor with the specified BookAuthorId in the request
exports.delete = (req, res) => {
    const BookBookId = req.query.bookId;
    const AuthorAuthorId = req.query.authorId;

    BookAuthor.destroy({
        where: { BookBookId: BookBookId, AuthorAuthorId: AuthorAuthorId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'BookAuthor was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete BookAuthor with BookBookId=${BookBookId}, AuthorAuthorId=${AuthorAuthorId}. Maybe BookAuthor was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete BookAuthor with BookBookId=' +
                    BookBookId +
                    'AuthorAuthorId=' +
                    AuthorAuthorId,
            });
        });
};

// Delete all BookAuthor from the database.
exports.deleteAll = (req, res) => {
    BookAuthor.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} BookAuthors were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all BookAuthors.',
            });
        });
};
// // Find all published BookAuthor
// exports.findAllName = (req, res) => {
//   BookAuthor.findAll({ where: { BookAuthorName: req.params.name } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving BookAuthor."
//         });
//       });
//   };
