const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Conectado a MySQL');
        connection.release();
    } catch (error) {
        console.error('Error MySQL:', error);
    }
})();

module.exports = db;