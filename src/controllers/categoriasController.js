const db = require('../config/db');

const GetCategorias = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener categorias' });
    }
};

module.exports = { GetCategorias };