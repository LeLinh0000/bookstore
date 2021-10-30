const express = require('express');
const router = express.Router();

const PublisherController = require('../app/controllers/PublisherController');

// Create a new publisher
router.post('/', PublisherController.create);

// Retrieve all publisher
router.get('/', PublisherController.findAll);

// Retrieve all published publisher
// router.get("/:name", PublisherController.findAllName);

// Retrieve a single publisher with id
router.get('/:id', PublisherController.findOne);

// Update a publisher with id
router.put('/:id', PublisherController.update);

// Delete a publisher with id
router.delete('/:id', PublisherController.delete);

// Delete all category
router.delete('/', PublisherController.deleteAll);

module.exports = router;
