const db = require('../config/db');
const cache = require('../utils/cache');

const GetCategorias = async (req, res) => {
    try {
        const key = 'categorias';
        const cacheData =
            cache.get(key);
        if (cacheData) {
            return res.json(
                cacheData
            );
        }

        const [rows] =
            await db.query(
                'SELECT * FROM categorias'
            );
        cache.set(
            key,
            rows
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    GetCategorias
};