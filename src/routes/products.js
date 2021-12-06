const express = require('express');
const router = express.Router();
const Book = require('../models/Book.model');

const ProductsController = require('../app/controllers/ProductsController');

router.get('/:id', ProductsController.details_product);

router.get('/', ProductsController.index);

module.exports = router;
