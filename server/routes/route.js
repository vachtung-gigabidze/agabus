const express = require('express');
const controller = require('../controller/controller');

const router = express.Router();
router.get('/api/actionContent', controller.getAll);
router.get('/api/actionContent/:id/', controller.getById);
router.post('/api/addActionContent', controller.add);
router.put('/api/updateActionContent/:id/', controller.update);
router.delete('/api/deleteActionContent/:id/', controller.delete);
router.get('/', controller.index);
router.get('/editAC/:id/', controller.editAC);
router.get('/addAC', controller.addAC);
router.get('/deleteAC/:id/', controller.addAC);
router.get('/favicon.ico', (req, res) => res.status(200))

module.exports = router;