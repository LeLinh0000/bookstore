const express = require('express');
const router = express.Router();
const translator = require('../app/controllers/TranslatorController.js');

// Create a new translator
router.post('/', translator.create);

// Retrieve all translator
router.get('/', translator.findAll);

// Retrieve a single translator with id
router.get('/:id', translator.findOne);

// Retrieve all translator with name
router.get('/:name', translator.findAllName);

// Update a translator with id
router.put('/:id', translator.update);

// Delete a translator with id
router.delete('/:id', translator.delete);

// Delete all translator
router.delete('/', translator.deleteAll);

module.exports = router;
