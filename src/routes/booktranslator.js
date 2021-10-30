const express = require('express');
const router = express.Router();

const BookTranslator = require('../app/controllers/BookTranslatorController');

// Create a new BookTranslator
router.post('/', BookTranslator.create);

// Retrieve all category
router.get('/', BookTranslator.findAll);

// Retrieve a single BookTranslator with id
router.get('/bookId/:bookId', BookTranslator.findOneWithBookID);

router.get(
    '/translatorId/:translatorId',
    BookTranslator.findOneWithTranslatorID,
);

// Retrieve all name book
// router.get("/:name", BookTranslator.findAllName);

// Update a BookTranslator with id
router.put('/update', BookTranslator.update);

// Delete a BookTranslator with id
router.delete('/delete', BookTranslator.delete);

// Delete all category
router.delete('/delete', BookTranslator.deleteAll);

module.exports = router;
