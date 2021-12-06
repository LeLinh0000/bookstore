const express = require('express');
const router = express.Router();

const ManagerOrderController = require('../app/controllers/ManagerOrderController');

router.get('/', ManagerOrderController.index);

module.exports = router;
