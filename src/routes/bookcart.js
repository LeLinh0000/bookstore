const express = require('express');
const router = express.Router();

const BookCartController = require('../app/controllers/BookCartController');

// Create a new Author
router.post('/', BookCartController.create);

// Retrieve all category
router.get('/', BookCartController.findAll);

// Update a Author with id
router.put('/', BookCartController.update);

// Delete a Author with id
router.delete('/', BookCartController.delete);

// Delete all category
router.delete('/', BookCartController.deleteAll);

module.exports = router;
