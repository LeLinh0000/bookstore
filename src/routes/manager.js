const express = require('express');
const router = express.Router();
const manager = require('../app/controllers/ManagerController.js');

// Create a new manager
router.post('/', manager.create);

// Retrieve all manager
router.get('/', manager.findAll);

// Retrieve all manager with name
router.get('/find/:permission', manager.findWithPermission);

// Retrieve a single manager with id
router.get('/:id', manager.findOne);

// Update a manager with id
router.put('/:id', manager.update);

// Delete a manager with id
router.delete('/:id', manager.delete);

// Delete all manager
router.delete('/', manager.deleteAll);

module.exports = router;
