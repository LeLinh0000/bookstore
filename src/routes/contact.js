const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/ContactController');

router.get('/', newsController.index);

module.exports = router;
