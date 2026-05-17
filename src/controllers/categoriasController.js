const db = require('../config/db');

const GetCategorias = async (req, res) => {
    try {

        console.log('ENTRO A CATEGORIAS');

        const [rows] = await db.query('SELECT * FROM categorias');

        console.log(rows);

        res.json(rows);

    } catch (error) {

        console.log('ERROR SQL:', error);

        res.status(500).json({
            mensaje: error.message
        });
    }
};

module.exports = { GetCategorias };