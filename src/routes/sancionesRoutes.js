const express = require('express');
const router = express.Router();
const { GetSanciones } = require('../controllers/sancionesController');

router.get('/categoria/:categoria_id', GetSanciones);

module.exports = router;