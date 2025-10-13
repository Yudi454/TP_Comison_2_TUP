const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();// traigo las variables de entorno desde el archivo .env


// Crea la conexion a la base de datos MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = {connection};// estoy habilitando que sea llamado desde otro archivo