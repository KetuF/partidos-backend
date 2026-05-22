const express=require('express');
const { GetPlantillaPorEquipo } = require('../controllers/plantillaController');

const router=express.Router();

router.get( '/:equipo_id', GetPlantillaPorEquipo);

module.exports=router;