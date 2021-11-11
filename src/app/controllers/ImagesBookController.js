const db = require('../../models/index');
const Image = db.image;
const Op = db.Sequelize.Op;

// Create and Save a new Image
exports.create = (req, res) => {
    // Validate request
    if (!req.body.path || !req.body.BookBookId) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }

    // Create a Image
    const image = {
        path: req.body.path,
        BookBookId: req.body.BookBookId,
    };

    // Save Image in the database
    Image.create(image)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while creating the Image.',
            });
        });
};

// Retrieve all Image from the database.
exports.findAll = (req, res) => {
    Image.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Image.',
            });
        });
};

// Find a single Image with an ImageId
exports.findOne = (req, res) => {
    const ImageId = req.params.id;

    Image.findByPk(ImageId)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Image with ImageId=${ImageId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving Image with ImageId=' + ImageId,
            });
        });
};

// Update a Image by the ImageId in the request
exports.update = (req, res) => {
    const ImageId = req.params.id;

    Image.update(req.body, {
        where: { imageId: ImageId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Image was updated successfully.',
                });
            } else {
                res.send({
                    message: `Cannot update Image with ImageId=${ImageId}. Maybe Image was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Image with ImageId=' + ImageId,
            });
        });
};

// Delete a Image with the specified ImageId in the request
exports.delete = (req, res) => {
    const ImageId = req.params.id;

    Image.destroy({
        where: { imageId: ImageId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: 'Image was deleted successfully!',
                });
            } else {
                res.send({
                    message: `Cannot delete Image with ImageId=${ImageId}. Maybe Image was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Image with ImageId=' + ImageId,
            });
        });
};

// Delete all Image from the database.
exports.deleteAll = (req, res) => {
    Image.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Images were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while removing all Images.',
            });
        });
};
// Find all published Image
exports.findImgOfBook = (req, res) => {
    const BookBookId = req.params.bookId;
    console.log(BookBookId);
    var condition = { BookBookId: { [Op.like]: `${BookBookId}` } };

    Image.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving Image.',
            });
        });
};
