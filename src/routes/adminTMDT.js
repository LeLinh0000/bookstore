const express = require('express');
const router = express.Router();

const adminTMDTController = require('../app/controllers/AdminTMDTController');

router.get('/product', adminTMDTController.product);

// router.get('/addBook', adminTMDTController.addBook);

router.get('/category', adminTMDTController.category);

// router.get('/bookAuthor', adminTMDTController.author);

// router.get('/bookTranslator', adminTMDTController.translator);

// router.get('/bookPublisher', adminTMDTController.publisher);

// router.get('/order', adminTMDTController.order);

router.get('/member', adminTMDTController.member);

router.get('/', adminTMDTController.index);

module.exports = router;
