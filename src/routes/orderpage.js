const express = require('express');
const router = express.Router();

const OrderPageController = require('../app/controllers/OrderPageController');

router.get('/', OrderPageController.index);

module.exports = router;
