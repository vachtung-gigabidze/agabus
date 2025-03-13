const express = require('express');
const AuthController = require('../controllers/auth_controller');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/activate', AuthController.activate);

module.exports = router;