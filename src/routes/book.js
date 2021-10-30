const express = require('express');
const router = express.Router();
const book = require('../app/controllers/BookController.js');

// Create a new book
router.post('/', book.create);

// Retrieve all book
router.get('/', book.findAll);

// Retrieve a single book with id
router.get('/:id', book.findOne);

// Retrieve all book with name
router.get('/:name', book.findAllName);

// Update a book with id
router.put('/:id', book.update);

// Delete a book with id
router.delete('/:id', book.delete);

// Delete all book
router.delete('/', book.deleteAll);

module.exports = router;
