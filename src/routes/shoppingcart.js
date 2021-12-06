const express = require('express');
const router = express.Router();

const ShoppingCartController = require('../app/controllers/ShoppingCartController');

router.get('/', ShoppingCartController.index);

module.exports = router;
