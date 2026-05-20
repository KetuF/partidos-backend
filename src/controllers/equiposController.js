const db = require('../config/db');

const GetEquipos = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT e.id, e.nombre, c.nombre as categoria
            FROM equipos e
            JOIN categorias c ON e.categoria_id = c.id
        `);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener equipos' });
    }
};

const GetEquiposPorCategoria = async (req, res) => {
    try {
        const { categoria_id } = req.params;
        const [rows] = await db.query(
            'SELECT * FROM equipos WHERE categoria_id = ?',
            [categoria_id]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener equipos' });
    }
};

module.exports = { GetEquipos, GetEquiposPorCategoria };