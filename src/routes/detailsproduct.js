const express = require('express');
const router = express.Router();

const DetailsProductController = require('../app/controllers/DetailsProductController');

router.get('/:id', DetailsProductController.index);

module.exports = router;
