const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();

// signing up a new user
router.post('/signup', UserController.createUser);

// logging in as a user
router.post('/login', UserController.userLogin);

module.exports = router;
