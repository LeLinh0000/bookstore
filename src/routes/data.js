const express = require('express');
const router = express.Router();

const AuthorController = require('../app/controllers/AuthorController');
const PublisherController = require('../app/controllers/PublisherController');

router.get('/author', AuthorController.index);

router.get('/publisher', PublisherController.index);

// test
router.get('/form', AuthorController.formAdd);

module.exports = router;
