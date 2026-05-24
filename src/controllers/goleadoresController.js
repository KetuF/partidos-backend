const db = require('../config/db');
const cache=require('../utils/cache');

const GetGoleadoresPorCategoria = async (req, res) => {

    try {
        const { categoria_id } =
        req.params;
        const key=
        `goleadores-${categoria_id}`;
        const cacheData=
        cache.get(key);

        if(cacheData){
            return res.json(
              cacheData
            );
        }

        const [rows] = await db.query(`
            SELECT
            g.id,
            g.nombre_jugador,
            g.goles,
            g.foto,
            e.nombre as equipo,
            e.escudo

            FROM goleadores g

            JOIN equipos e
            ON g.equipo_id=e.id

            WHERE e.categoria_id=?

            ORDER BY g.goles DESC
        `,[categoria_id]);
        cache.set(
          key,
          rows
        );
        res.json(rows);
    } catch(error){
        res.status(500).json({
            mensaje:'Error al obtener goleadores'
        });
    }
};

module.exports = { GetGoleadoresPorCategoria };