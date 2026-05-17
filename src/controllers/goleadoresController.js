const db = require('../config/db');

const GetGoleadoresPorCategoria = async (req, res) => {
    try {
        const { categoria_id } = req.params;
        const [rows] = await db.query(`
            SELECT g.id, g.nombre_jugador, g.goles, e.nombre as equipo
            FROM goleadores g
            JOIN equipos e ON g.equipo_id = e.id
            WHERE e.categoria_id = ?
            ORDER BY g.goles DESC
        `, [categoria_id]);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener goleadores' });
    }
};

module.exports = { GetGoleadoresPorCategoria };