const express = require('express');

const router = express.Router();

const controller = require('../controllers/votacao-controller');

router.post('/create', controller.createVotacao);
router.get('/read', controller.readVotacao);

module.exports = router;