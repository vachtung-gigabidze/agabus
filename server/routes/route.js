const express = require('express');
const controller = require('../controller/controller');
const regAircontroller = require('../controller/regAirServiceController');

const router = express.Router();

router.get('/api/actionContent', controller.getAllActionContent);
router.get('/api/actionContent/:id/', controller.getByIdActionContent);
router.post('/api/addActionContent', controller.addActionContent);
router.put('/api/updateActionContent/:id/', controller.updateActionContent);
router.delete('/api/deleteActionContent/:id/', controller.deleteActionContent);

router.get('/', controller.index);
router.get('/editAC/:id/', controller.editAC);
router.get('/addAC', controller.addAC);
router.get('/deleteAC/:id/', controller.addAC);
router.get('/favicon.ico', (req, res) => res.status(200));


//RegAirService
router.get('/regAir/', regAircontroller.regAirService);
router.get('/api/regAirService', regAircontroller.getAllRegAirService);
router.post('/api/addRegAirService', regAircontroller.addRegAirService);
router.put('/api/updateRegAirService/:id/', regAircontroller.updateRegAirService);


// router.use('/graphql', controller.graphqlHTTP);

module.exports = router;