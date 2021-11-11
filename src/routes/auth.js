const express = require('express');
const router = express.Router();

const AuthController = require('../app/controllers/AuthController');

// Create a new Auth
router.post('/login', AuthController.login);

router.get('/logout', AuthController.logout);

module.exports = router;
