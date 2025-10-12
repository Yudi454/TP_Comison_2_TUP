import mysql from 'mysql2';
import dotenv from 'dotenv';

//Inicializamos dotenv

dotenv.config();

//Creamos la conexion a la DB

const conexion = mysql.createConnection({  // createPool permite manejar multiples conexiones a la DB
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT
});

//Exportamos la conexion

export default conexion;