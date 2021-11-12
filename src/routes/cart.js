const express = require('express');
const router = express.Router();
const cart = require('../app/controllers/CartController.js');

// Create a new cart
router.post('/', cart.create);

// Retrieve a single cart with id
router.get('/session', cart.findUserId);

router.get('/find/:id', cart.findOne);

// // Retrieve all cart with name

// Retrieve all cart
router.get('/', cart.findAll);
// router.get('/:name', cart.findAllName);

// Update a cart with id
router.put('/:id', cart.update);

// Delete a cart with id
router.delete('/:id', cart.delete);

// Delete all cart
router.delete('/', cart.deleteAll);

module.exports = router;
