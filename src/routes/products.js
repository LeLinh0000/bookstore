const express = require('express');
const router = express.Router();
const Book = require('../models/Book.model');

const ProductsController = require('../app/controllers/ProductsController');

router.get('/:idsp?', ProductsController.index);

router.delete('/:idsp', ProductsController.delete);

router.put('/:idsp', ProductsController.update);

router.post('/', ProductsController.add);

// router.get('/', ProductsController.index);

module.exports = router;
