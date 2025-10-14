import mysql from 'mysql2';
import dotenv from 'dotenv';

//Inicializamos dotenv

dotenv.config();

//Creamos la conexion a la DB

const conexion = mysql.createConnection({  
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,  
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Exportamos la conexion

export default conexion;