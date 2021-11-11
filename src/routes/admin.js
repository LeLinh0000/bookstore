const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/books', adminController.books);

router.get('/addBook', adminController.addBook);

router.get('/bookCategory', adminController.category);

router.get('/bookAuthor', adminController.author);

router.get('/bookTranslator', adminController.translator);

router.get('/bookPublisher', adminController.publisher);

router.get('/manager', adminController.manager);

router.get('/', adminController.index);

module.exports = router;
