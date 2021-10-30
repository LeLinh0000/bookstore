const express = require('express');
const router = express.Router();

const AuthorController = require('../app/controllers/AuthorController');

// Create a new Author
router.post('/', AuthorController.create);

// Retrieve all category
router.get('/', AuthorController.findAll);

// Retrieve a single Author with id
router.get('/:id', AuthorController.findOne);

// Retrieve all published author
router.get('/:name', AuthorController.findAllName);

// Update a Author with id
router.put('/:id', AuthorController.update);

// Delete a Author with id
router.delete('/:id', AuthorController.delete);

// Delete all category
router.delete('/', AuthorController.deleteAll);

module.exports = router;
