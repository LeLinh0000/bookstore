const db = require('../../models/index');
const Book = db.book;
const BookAuthor = db.bookAuthor;
const BookTranslator = db.bookTranslator;
const BookCategory = db.bookCategory;

const Publisher = db.publisher;
const Author = db.author;
const Translator = db.translator;
const Category = db.category;
const Image = db.image;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.bookName) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Book
    let episode = req.body.episode ? req.body.episode : null;
    let language = req.body.language ? req.body.language : 'Tiếng Việt';
    let layout = req.body.bookLayout ? req.body.bookLayout : 'Bìa mềm';
    let image = req.body.coverImage
        ? '/img/products/' + req.body.coverImage
        : '/img/products/product0.jpg';

    const book = {
        bookName: req.body.bookName,
        coverPrice: req.body.coverPrice,
        price: req.body.price,
        episode: episode,
        language: language,
        bookSize: req.body.bookSize,
        quantityOfPage: req.body.quantityOfPage,
        weight: req.body.weight,
        bookLayout: layout,
        publishYear: req.body.publishYear,
        coverImage: image,
        description: req.body.description,
        PublisherPublisherId: req.body.PublisherPublisherId,
    };

    // Save Book in the database
    Book.create(book)
        .then((data) => {
            // Insert data to relationship table
            addBookAuthor(data);
            addBookCategory(data);
            if (req.body.bookTranslator) addBookTranslator(data);
            req.flash('message', 'Thêm sách mới thành công');
            res.redirect('/admin/addBook');
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
        req.body.bookAuthor.forEach((element) => {
            const bookauthor = {
                BookBookId: data.bookId,
                AuthorAuthorId: element,
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
        });
    }

    // Save bookTranslator in the database
    function addBookTranslator(data) {
        req.body.bookTranslator.forEach((element) => {
            const bookTranslator = {
                BookBookId: data.bookId,
                TranslatorTranslatorId: element,
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
        });
    }

    // Save bookCategory in the database
    function addBookCategory(data) {
        req.body.bookCategory.forEach((element) => {
            const bookCategory = {
                BookBookId: data.bookId,
                CategoryCategoryId: element,
            };

            // Save BookCategory in the database
            BookCategory.create(bookCategory)
                .then((dataBA) => {
                    res.send(dataBA);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message ||
                            'Some error occurred while creating the BookCategory.',
                    });
                });
        });
    }
};

// Retrieve all Book from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { bookName: { [Op.like]: `%${name}%` } } : null;

    Book.findAll({
        where: condition,
        include: [Image, Author, Translator, Category, Publisher],
    })
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

    Book.findOne({
        where: {
            bookId: BookId,
        },
        include: [Image, Author, Translator, Category, Publisher],
    })
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

// Find a single Book with an BookId
exports.findOneDetail = (req, res) => {
    const BookId = req.params.id;

    Book.findOne({
        where: {
            bookId: BookId,
        },
        include: [Image, Author, Translator, Category, Publisher],
    })
        .then((data) => {
            if (data) {
                res.render('details_product', {
                    data: data,
                    ...{
                        userId: req.session.userId,
                        userName: req.session.userName,
                        userAvatar: req.session.userAvatar,
                        message: req.flash('registerSuccess'),
                    },
                });
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
    const bookId = req.params.id;

    const AuthorAuthorId = req.body.AuthorAuthorId;
    const TranslatorTranslatorId = req.body.TranslatorTranslatorId;

    // Create a Book
    let episode = req.body.episode ? req.body.episode : null;
    let language = req.body.language ? req.body.language : 'Tiếng Việt';
    let layout = req.body.bookLayout ? req.body.bookLayout : 'Bìa mềm';
    let image = req.body.coverImage
        ? '/img/products/' + req.body.coverImage
        : '/img/products/product0.jpg';

    const book = {
        bookName: req.body.bookName,
        coverPrice: req.body.coverPrice,
        price: req.body.price,
        episode: episode,
        language: language,
        bookSize: req.body.bookSize,
        quantityOfPage: req.body.quantityOfPage,
        weight: req.body.weight,
        bookLayout: layout,
        publishYear: req.body.publishYear,
        coverImage: image,
        description: req.body.description,
        PublisherPublisherId: req.body.PublisherPublisherId,
    };

    Book.update(book, {
        where: { bookId: bookId },
    })
        .then((num) => {
            if (num == 1) {
                updateBookAuthor(AuthorAuthorId, bookId);
                updateBookTranslator(TranslatorTranslatorId, bookId);
                res.send({
                    message: 'Book was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Book with bookId=${bookId}. Maybe Book was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Book with bookId=' + bookId,
            });
        });

    // update BookAuthor in the database
    function updateBookAuthor(AuthorAuthorId, bookId) {
        console.log(AuthorAuthorId, bookId);
        const bookauthor = {
            BookBookId: bookId,
            AuthorAuthorId: AuthorAuthorId,
        };

        BookAuthor.update(bookauthor, {
            where: { BookBookId: bookId, AuthorAuthorId: AuthorAuthorId },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: 'BookAuthor was updated successfully.',
                    });
                } else {
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
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        'Error updating BookAuthor with BookBookId=' +
                        bookId +
                        'AuthorAuthorId=' +
                        AuthorAuthorId,
                });
            });
    }

    // update bookTranslator in the database
    function updateBookTranslator(TranslatorTranslatorId, bookId) {
        console.log(TranslatorTranslatorId, bookId);

        const bookTranslator = {
            BookBookId: bookId,
            TranslatorTranslatorId: TranslatorTranslatorId,
        };

        BookTranslator.update(bookTranslator, {
            where: {
                BookBookId: bookId,
                TranslatorTranslatorId: TranslatorTranslatorId,
            },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: 'BookTranslator was updated successfully.',
                    });
                } else {
                    BookTranslator.create(bookTranslator)
                        .then((data) => {
                            res.send(data);
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    'Some error occurred while creating the BookTranslator.',
                            });
                        });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        'Error updating BookTranslator with BookBookId=' +
                        bookId +
                        'TranslatorTranslatorId=' +
                        TranslatorTranslatorId,
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
