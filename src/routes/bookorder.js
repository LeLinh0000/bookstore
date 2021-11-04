const express = require('express');
const router = express.Router();

const BookOrderController = require('../app/controllers/BookOrderController');

// Create a new Author
router.post('/', BookOrderController.create);

// Retrieve all category
router.get('/', BookOrderController.findAll);

// Update a Author with id
router.put('/', BookOrderController.update);

// Delete a Author with id
router.delete('/', BookOrderController.delete);

// Delete all category
router.delete('/', BookOrderController.deleteAll);

module.exports = router;
