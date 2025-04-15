const express = require('express');
const AuthController = require('../controller/auth_controller');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/activate', AuthController.activate);

module.exports = router;