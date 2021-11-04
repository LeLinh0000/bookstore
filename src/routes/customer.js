const express = require('express');
const router = express.Router();
const customer = require('../app/controllers/CustomerController.js');

// Create a new customer
router.post('/', customer.create);

// Retrieve all customer
router.get('/', customer.findAll);

// Retrieve all customer with name
router.get('/find/:email', customer.findWithEmail);

// Retrieve a single customer with id
router.get('/:id', customer.findOne);

// Update a customer with id
router.put('/:id', customer.update);

// Delete a customer with id
router.delete('/:id', customer.delete);

// Delete all customer
router.delete('/', customer.deleteAll);

module.exports = router;
