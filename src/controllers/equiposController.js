const db = require('../config/db');
const cache=require('../utils/cache');

const db = require('../config/db');
const cache=require('../utils/cache');

const GetEquipos = async (req, res) => {
    try {
        const key='equipos';
        const cacheData=
        cache.get(key);
        if(cacheData){
            console.log('CACHE equipos');
            return res.json(
                cacheData
            );
        }

        const [rows] = await db.query(`
            SELECT
            e.id,
            e.nombre,
            e.escudo,
            c.nombre as categoria
            FROM equipos e
            JOIN categorias c
            ON e.categoria_id = c.id
        `);
        cache.set(
            key,
            rows
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje:'Error al obtener equipos'
        });
    }
};

const GetEquiposPorCategoria = async (req,res)=>{
 try{
   const {categoria_id}=req.params;
   const key=`equipos-${categoria_id}`;
   const cacheData=
   cache.get(key);

   if(cacheData){
      return res.json(
        cacheData
      );
   }

   const [rows]=await db.query(
    `SELECT *
    FROM equipos
    WHERE categoria_id=?`,
    [categoria_id]
   );
   cache.set(
    key,
    rows
   );
   res.json(rows);
 }catch(error){
   res.status(500).json({
    mensaje:'Error al obtener equipos'
   });
 }

};

module.exports={
 GetEquipos,
 GetEquiposPorCategoria
};