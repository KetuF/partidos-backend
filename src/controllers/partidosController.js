const db = require('../config/db');

const GetPartidosPorCategoria = async (req, res) => {
    try {
        const { categoria_id } = req.params;
        const [rows] = await db.query(`
            SELECT p.id, p.fecha, p.hora, p.jugado, p.numero_fecha,
                   p.goles_local, p.goles_visitante,
                   el.nombre as equipo_local,
                   ev.nombre as equipo_visitante
            FROM partidos p
            JOIN equipos el ON p.equipo_local_id = el.id
            JOIN equipos ev ON p.equipo_visitante_id = ev.id
            WHERE p.categoria_id = ?
            ORDER BY p.numero_fecha ASC, p.hora ASC
        `, [categoria_id]);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener partidos' });
    }
};

const GetPartidosPorEquipo = async (req, res) => {
    try {
        const { equipo_id } = req.params;
        const [rows] = await db.query(`
            SELECT p.id, p.fecha, p.hora, p.jugado,
                   p.goles_local, p.goles_visitante,
                   el.nombre as equipo_local,
                   ev.nombre as equipo_visitante
            FROM partidos p
            JOIN equipos el ON p.equipo_local_id = el.id
            JOIN equipos ev ON p.equipo_visitante_id = ev.id
            WHERE p.equipo_local_id = ? OR p.equipo_visitante_id = ?
            ORDER BY p.fecha ASC
        `, [equipo_id, equipo_id]);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener partidos del equipo' });
    }
};

module.exports = { GetPartidosPorCategoria, GetPartidosPorEquipo };