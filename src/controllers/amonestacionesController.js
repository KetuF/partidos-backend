const db = require('../config/db');

const GetAmonestaciones = async (req, res) => {
    try {
        const { equipo_id } = req.params;

        const [rows] = await db.query(`
            SELECT a.id, a.nombre_jugador, a.amarillas, e.nombre as equipo
            FROM amonestaciones a
            JOIN equipos e ON a.equipo_id = e.id
            WHERE a.equipo_id = ?
            ORDER BY a.amarillas DESC
        `, [equipo_id]);

        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener amonestaciones' });
    }
}

module.exports = { GetAmonestaciones };