const express = require('express');

const router = express.Router();

const controller = require('../controllers/votacao-controller');

router.post('/create', controller.createVotacao);

module.exports = router;