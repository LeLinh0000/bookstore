const express = require('express');
const router = express.Router();

const BookCategoryController = require('../app/controllers/BookCategoryController');

// Create a new BookCategory
router.post('/', BookCategoryController.create);

// Retrieve all BookCategory
router.get('/', BookCategoryController.findAll);

// Retrieve a single BookCategory with bookId || categoryId
router.get('/bookId/:bookId', BookCategoryController.findOneWithBookID);

router.get(
    '/categoryId/:categoryId',
    BookCategoryController.findOneWithCategoryID,
);

// Retrieve all name book
// router.get("/:name", BookCategoryController.findAllName);

// Update a BookCategory with id
router.put('/update/', BookCategoryController.update);

// Delete a BookCategory with id
router.delete('/delete', BookCategoryController.delete);

// Delete all BookCategory
router.delete('/delete', BookCategoryController.deleteAll);

module.exports = router;
