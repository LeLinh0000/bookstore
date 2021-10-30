const express = require('express');
const router = express.Router();
const category = require('../app/controllers/CategoryController.js');

// Create a new category
router.post('/', category.create);

// Retrieve all category
router.get('/', category.findAll);

// Retrieve a single category with id
router.get('/:id', category.findOne);

// Retrieve all category with name
router.get('/:name', category.findAllName);

// Update a category with id
router.put('/:id', category.update);

// Delete a category with id
router.delete('/:id', category.delete);

// Delete all category
router.delete('/', category.deleteAll);

module.exports = router;
