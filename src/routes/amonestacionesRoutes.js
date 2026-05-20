const express = require('express');
const router = express.Router();
const { GetAmonestaciones } = require('../controllers/amonestacionesController');

router.get('/equipo/:equipo_id', GetAmonestaciones);

module.exports = router;