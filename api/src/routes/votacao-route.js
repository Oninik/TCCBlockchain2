const express = require('express');

const router = express.Router();

const controller = require('../controllers/votacao-controller');

router.post('/create', controller.createVotacao);
router.get('/read', controller.readVotacao);
router.post('/votar', controller.Votar);
router.post('/adop', controller.acionarOpcao);


module.exports = router; 