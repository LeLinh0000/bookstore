const express = require('express');
const router = express.Router();
const order = require('../app/controllers/OrderController.js');

// Create a new order
router.post('/', order.create);

// Retrieve all order with name
router.get('/find/:customerId', order.findOrdersOfCus);

// // Retrieve a single order with id
// router.get('/find', order.findordersHaveCmt);

// Retrieve order orderId
router.get('/:id', order.findOne);

// Retrieve all order || find with order /?order = ...
router.get('/', order.findAll);

// Update a order with id
router.put('/:id', order.update);

// Delete a order with id
router.delete('/:id', order.delete);

// Delete all order
router.delete('/', order.deleteAll);

module.exports = router;
