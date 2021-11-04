const express = require('express');
const router = express.Router();
const rate = require('../app/controllers/RateController.js');

// Create a new rate
router.post('/', rate.create);

// Retrieve all rate with name
router.get('/find/:customerId', rate.findRatesOfCus);

// Retrieve a single rate with id
router.get('/find', rate.findRatesHaveCmt);

// Retrieve all rate || find with rate /?rate = ...
router.get('/', rate.findAll);

// Update a rate with id
router.put('/:id', rate.update);

// Delete a rate with id
router.delete('/:id', rate.delete);

// Delete all rate
router.delete('/', rate.deleteAll);

module.exports = router;
