const db = require('../config/db');
const cache = require('../utils/cache');

const GetSanciones = async (req, res) => {
    try {
        const { categoria_id } = req.params;
        const key =
            `sanciones-${categoria_id}`;
        const cacheData =
            cache.get(key);
        if (cacheData) {
            return res.json(
                cacheData
            );
        }

        const [ultimaFecha] = await db.query(
            'SELECT MAX(numero_fecha) as ultima FROM partidos WHERE categoria_id=? AND jugado=1',
            [categoria_id]
        );

        const fechaActual =
            ultimaFecha[0].ultima || 0;
        const [rows] = await db.query(`SELECT ...`, [fechaActual, categoria_id]);

        cache.set(
            key,
            rows
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error'
        });

    }
}

module.exports = { GetSanciones };