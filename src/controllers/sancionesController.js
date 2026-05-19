const db = require('../config/db');

const GetSanciones = async (req, res) => {
    try {
        const { categoria_id } = req.params;

        const [ultimaFecha] = await db.query(
            'SELECT MAX(numero_fecha) as ultima FROM partidos WHERE categoria_id = ? AND jugado = 1',
            [categoria_id]
        );
        const fechaActual = ultimaFecha[0].ultima || 0;

        const [rows] = await db.query(`
            SELECT s.id, s.nombre_jugador, s.tipo, s.partidos_sancion, s.numero_fecha_inicio,
                   e.nombre as equipo,
                   (s.partidos_sancion - (? - s.numero_fecha_inicio)) as fechas_restantes
            FROM sanciones s
            JOIN equipos e ON s.equipo_id = e.id
            WHERE s.categoria_id = ?
            HAVING fechas_restantes > 0
            ORDER BY fechas_restantes ASC
        `, [fechaActual, categoria_id]);

        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener sanciones' });
    }
};

module.exports = { GetSanciones };