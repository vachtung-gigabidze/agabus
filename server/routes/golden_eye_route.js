const express = require('express');
const controller = require('../controller/golden_eye_controller');

const router = express.Router();

router.get('/find_person/:name', controller.findPerson);

module.exports = router;