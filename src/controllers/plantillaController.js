const db = require('../config/db');

const GetPlantillaPorEquipo = async (req,res)=>{

    try{

        const { equipo_id } = req.params;

        const [rows] = await db.query(`

            SELECT
                id,
                nombre,
                apellido

            FROM plantilla

            WHERE equipo_id=?

            ORDER BY apellido ASC,nombre ASC

        `,[equipo_id]);

        res.json(rows);

    }catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:'Error al obtener plantilla'
        });

    }

};

module.exports={
    GetPlantillaPorEquipo
};