const express = require('express');
const controller = require('../controller/golden_eye_controller');

const router = express.Router();

router.get('/golden_eye/find_person', controller.findPerson);

module.exports = router;