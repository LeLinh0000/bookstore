const express = require('express');
const router = express.Router();
const image = require('../app/controllers/ImageController.js');

// Create a new image
router.post('/', image.create);

// Retrieve all image with name
router.get('/find/:bookId', image.findImgOfBook);

// Retrieve a single image with id
router.get('/:id', image.findOne);

// Retrieve all image
router.get('/', image.findAll);

// Update a image with id
router.put('/:id', image.update);

// Delete a image with id
router.delete('/:id', image.delete);

// Delete all image
router.delete('/', image.deleteAll);

module.exports = router;
