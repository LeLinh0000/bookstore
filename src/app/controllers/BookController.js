const db = require('../../models/index');
const Book = db.book;
const BookAuthor = db.bookAuthor;
const BookTranslator = db.bookTranslator;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.BookName) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Book
    let episode = req.body.episode ? req.body.episode : null;
    let language = req.body.language ? req.body.language : 'Tiếng Việt';

    const book = {
        bookName: req.body.BookName,
        coverPrice: req.body.coverPrice,
        price: req.body.price,
        episode: episode,
        language: language,
        bookLayout: req.body.bookLayout,
        quantityOfPage: req.body.quantityOfPage,
        weight: req.body.weight,
        publishYear: req.body.publishYear,
        description: req.body.description,
        TranslatorId: req.body.TranslatorId,
    };

    // Save Book in the database
    Book.create(book)
        .then((data) => {
            // Insert data to relationship table
            addBookAuthor(data);
            if (req.body.TranslatorTranslatorId) addBookTranslator(data);
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Book.',
            });
        });

    // Save BookAuthor in the database
    function addBookAuthor(data) {
        const bookauthor = {
            BookBookId: data.bookId,
            AuthorAuthorId: req.body.AuthorAuthorId,
        };

        BookAuthor.create(bookauthor)
            .then((dataBA) => {
                res.send(dataBA);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while creating the BookAuthor.',
                });
            });
    }

    // Save bookTranslator in the database
    function addBookTranslator(data) {
        const bookTranslator = {
            BookBookId: data.bookId,
            TranslatorTranslatorId: req.body.TranslatorTranslatorId,
        };

        // Save BookTranslator in the database
        BookTranslator.create(bookTranslator)
            .then((dataBA) => {
                res.send(dataBA);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while creating the BookTranslator.',
                });
            });
    }
};

// Retrieve all Book from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { bookName: { [Op.like]: `%${name}%` } } : null;

    Book.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Book.',
            });
        });
};

// Find a single Book with an BookId
exports.findOne = (req, res) => {
    const BookId = req.params.id;

    Book.findByPk(BookId)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Book with BookId=${BookId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Book with BookId=' + BookId,
            });
        });
};

// Update a Book by the id_loaisach in the request
exports.update = (req, res) => {
    const BookId = req.params.id;

    // Create a Book
    let episode = req.body.episode ? req.body.episode : null;
    let language = req.body.language ? req.body.language : 'Tiếng Việt';

    const book = {
        bookName: req.body.BookName,
        coverPrice: req.body.coverPrice,
        price: req.body.price,
        episode: episode,
        language: language,
        bookLayout: req.body.bookLayout,
        quantityOfPage: req.body.quantityOfPage,
        weight: req.body.weight,
        publishYear: req.body.publishYear,
        description: req.body.description,
        TranslatorId: req.body.TranslatorId,
    };

    Book.update(book, {
        where: { bookId: BookId },
    })
        .then((num) => {
            if (num == 1) {
                updateBookAuthor(book);
                res.send({
                    message: 'Book was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Book with BookId=${BookId}. Maybe Book was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Book with BookId=' + BookId,
            });
        });

    // update BookAuthor in the database
    function updateBookAuthor(data) {
        const BookBookId = data.bookId;
        const AuthorAuthorId = req.body.AuthorAuthorId;

        const bookauthor = {
            BookBookId: BookBookId,
            AuthorAuthorId: AuthorAuthorId,
        };

        BookAuthor.update(bookauthor, {
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
    }

    // update bookTranslator in the database
    function updateBookTranslator(data) {
        const bookTranslator = {
            BookBookId: data.bookId,
            TranslatorTranslatorId: req.body.TranslatorTranslatorId,
        };

        // update BookTranslator in the database
        BookTranslator.create(bookTranslator)
            .then((dataBA) => {
                res.send(dataBA);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while creating the BookTranslator.',
                });
            });
    }
};

// Delete a Book with the specified BookId in the request
exports.delete = (req, res) => {
    const BookId = req.params.id;

    Book.destroy({
        where: { bookId: BookId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Book was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Book with BookId=${BookId}. Maybe Book was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Book with BookId=' + BookId,
            });
        });
};

// Delete all Book from the database.
exports.deleteAll = (req, res) => {
    Book.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Books were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all Books.',
            });
        });
};
// Find all published Book
exports.findAllName = (req, res) => {
    Book.findAll({ where: { bookName: req.params.name } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving Book.',
            });
        });
};
