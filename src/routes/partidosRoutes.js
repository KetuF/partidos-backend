const express = require('express');
const router = express.Router();
const { GetPartidosPorCategoria, GetPartidosPorEquipo } = require('../controllers/partidosController');

router.get('/categoria/:categoria_id', GetPartidosPorCategoria);
router.get('/equipo/:equipo_id', GetPartidosPorEquipo);

module.exports = router;