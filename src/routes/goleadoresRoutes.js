const express = require('express');
const router = express.Router();
const { GetGoleadoresPorCategoria } = require('../controllers/goleadoresController');

router.get('/categoria/:categoria_id', GetGoleadoresPorCategoria);

module.exports = router;