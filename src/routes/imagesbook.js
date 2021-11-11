const express = require('express');
const router = express.Router();
const imagesBook = require('../app/controllers/ImagesBookController.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png'
        ) {
            cb(null, 'F:/JS/Bookstore/src/public/img/products');
        }
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, filename + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Create a new imageProduct
router.post('/', upload.array('formFileMultiple[]', 3), (req, res, next) => {
    const files = req.files;
    if (!files) {
        const error = new Error('Upload files again');
        error.httpStatusCode = 400;
        return next(error);
    }

    res.send(files);
});

module.exports = router;
