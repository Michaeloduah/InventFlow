const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/authentication');
const UserController = require('../controllers/UserController');

// User Routes
router.get('/login', middleware.isNotAuthenticated , UserController.login);
router.get('/register', middleware.isNotAuthenticated , UserController.register);

module.exports = router;