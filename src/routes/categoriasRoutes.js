const express = require('express');
const router = express.Router();
const { GetCategorias } = require('../controllers/categoriasController');

router.get('/', GetCategorias);

module.exports = router;