const express = require('express');
const router = express.Router();
const { GetEquipos, GetEquiposPorCategoria } = require('../controllers/equiposController');

router.get('/', GetEquipos);
router.get('/categoria/:categoria_id', GetEquiposPorCategoria);

module.exports = router;