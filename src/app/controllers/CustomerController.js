const db = require('../../models/index');
const Customer = db.customer;
const CustomerAuthor = db.CustomerAuthor;
const CustomerTranslator = db.CustomerTranslator;
const Op = db.Sequelize.Op;

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
    let avatar = req.body.avatar ? req.body.avatar : '/img/avatar/avatar.png';

    const customer = {
        customerName: req.body.customerName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        address: req.body.episode,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        avatar: avatar,
    };

    // Save Customer in the database
    Customer.create(customer)
        .then((data) => {
            // // Insert data to relationship table
            // addCustomerAuthor(data);
            // if (req.body.TranslatorTranslatorId) addCustomerTranslator(data);
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Customer.',
            });
        });

    // Save CustomerAuthor in the database
    // function addCustomerAuthor(data) {
    //     const Customerauthor = {
    //         CustomerId: data.CustomerId,
    //         AuthorAuthorId: req.body.AuthorAuthorId,
    //     };

    //     CustomerAuthor.create(Customerauthor)
    //         .then((dataBA) => {
    //             res.send(dataBA);
    //         })
    //         .catch((err) => {
    //             res.status(500).send({
    //                 message:
    //                     err.message ||
    //                     'Some error occurred while creating the CustomerAuthor.',
    //             });
    //         });
    // }

    // // Save CustomerTranslator in the database
    // function addCustomerTranslator(data) {
    //     const CustomerTranslator = {
    //         CustomerId: data.CustomerId,
    //         TranslatorTranslatorId: req.body.TranslatorTranslatorId,
    //     };

    //     // Save CustomerTranslator in the database
    //     CustomerTranslator.create(CustomerTranslator)
    //         .then((dataBA) => {
    //             res.send(dataBA);
    //         })
    //         .catch((err) => {
    //             res.status(500).send({
    //                 message:
    //                     err.message ||
    //                     'Some error occurred while creating the CustomerTranslator.',
    //             });
    //         });
    // }
};

// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { customerName: { [Op.like]: `%${name}%` } } : null;

    Customer.findAll({ where: condition })
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

// Find a single Customer with an CustomerId
exports.findOne = (req, res) => {
    const CustomerId = req.params.id;

    Customer.findByPk(CustomerId)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Customer with CustomerId=${CustomerId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error retrieving Customer with CustomerId=' + CustomerId,
            });
        });
};

// Update a Customer by the id_loaisach in the request
exports.update = (req, res) => {
    const CustomerId = req.params.id;

    // Create a Customer
    let episode = req.body.episode ? req.body.episode : null;
    let language = req.body.language ? req.body.language : 'Tiếng Việt';

    const Customer = {
        customerName: req.body.customerName,
        coverPrice: req.body.coverPrice,
        price: req.body.price,
        episode: episode,
        language: language,
        CustomerLayout: req.body.CustomerLayout,
        quantityOfPage: req.body.quantityOfPage,
        weight: req.body.weight,
        publishYear: req.body.publishYear,
        description: req.body.description,
        TranslatorId: req.body.TranslatorId,
    };

    Customer.update(Customer, {
        where: { CustomerId: CustomerId },
    })
        .then((num) => {
            if (num == 1) {
                updateCustomerAuthor(Customer);
                res.send({
                    message: 'Customer was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Customer with CustomerId=${CustomerId}. Maybe Customer was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Error updating Customer with CustomerId=' + CustomerId,
            });
        });

    // update CustomerAuthor in the database
    function updateCustomerAuthor(data) {
        const CustomerId = data.CustomerId;
        const AuthorAuthorId = req.body.AuthorAuthorId;

        const Customerauthor = {
            CustomerId: CustomerId,
            AuthorAuthorId: AuthorAuthorId,
        };

        CustomerAuthor.update(Customerauthor, {
            where: { CustomerId: CustomerId, AuthorAuthorId: AuthorAuthorId },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: 'CustomerAuthor was updated successfully.',
                    });
                } else {
                    res.send({
                        message: `Cannot update CustomerAuthor with CustomerId=${CustomerId}, AuthorAuthorId=${AuthorAuthorId}. Maybe CustomerAuthor was not found or req.body is empty!`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        'Error updating CustomerAuthor with CustomerId=' +
                        CustomerId +
                        'AuthorAuthorId=' +
                        AuthorAuthorId,
                });
            });
    }

    // update CustomerTranslator in the database
    function updateCustomerTranslator(data) {
        const CustomerTranslator = {
            CustomerId: data.CustomerId,
            TranslatorTranslatorId: req.body.TranslatorTranslatorId,
        };

        // update CustomerTranslator in the database
        CustomerTranslator.create(CustomerTranslator)
            .then((dataBA) => {
                res.send(dataBA);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        'Some error occurred while creating the CustomerTranslator.',
                });
            });
    }
};

// Delete a Customer with the specified CustomerId in the request
exports.delete = (req, res) => {
    const CustomerId = req.params.id;

    Customer.destroy({
        where: { CustomerId: CustomerId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Customer was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with CustomerId=${CustomerId}. Maybe Customer was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Could not delete Customer with CustomerId=' + CustomerId,
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
exports.findAllName = (req, res) => {
    Customer.findAll({ where: { customerName: req.params.name } })
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
