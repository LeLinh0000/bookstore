const express = require('express');
const router = express.Router();
const Book = require('../models/Book.model');

const ProductsController = require('../app/controllers/ProductsController');

router.get('/', ProductsController.index);

router.get('/details', ProductsController.details_product);

module.exports = router;
