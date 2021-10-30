const express = require('express');
const router = express.Router();
const discount = require('../app/controllers/DiscountController.js');

// Create a new discount
router.post('/', discount.create);

// Retrieve all discount with condition
router.get('/find', discount.findWithCondition);

// Retrieve a single discount with id
router.get('/:id', discount.findOne);

// Retrieve all discount
router.get('/', discount.findAll);

// Update a discount with id
router.put('/:id', discount.update);

// Delete a discount with id
router.delete('/:id', discount.delete);

// Delete all discount
router.delete('/', discount.deleteAll);

module.exports = router;
