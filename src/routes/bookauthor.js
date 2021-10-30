const express = require('express');
const router = express.Router();

const BookAuthorController = require('../app/controllers/BookAuthorController');

// Create a new Author
router.post('/', BookAuthorController.create);

// Retrieve all category
router.get('/', BookAuthorController.findAll);

// Retrieve a single Author with id
router.get('/bookId/:bookId', BookAuthorController.findOneWithBookID);

router.get('/authorId/:authorId', BookAuthorController.findOneWithAuthorID);

// Retrieve all name book
// router.get("/:name", BookAuthorController.findAllName);

// Update a Author with id
router.put('/update/', BookAuthorController.update);

// Delete a Author with id
router.delete('/delete', BookAuthorController.delete);

// Delete all category
router.delete('/delete', BookAuthorController.deleteAll);

module.exports = router;
