const express = require('express');
const router = express.Router();
const multer = require('multer');
const middleware = require('../middlewares/authentication');
const UserController = require('../controllers/UserController');


const upload = multer({ dest: 'uploads/profile_profile' });

// User Routes
router.get('/login', middleware.isNotAuthenticated , UserController.login);
router.get('/register', middleware.isNotAuthenticated , UserController.register);
router.post('/signup', upload.single('image'), middleware.isNotAuthenticated , UserController.signup);
router.post('/signin', middleware.isNotAuthenticated , UserController.signin);

module.exports = router;