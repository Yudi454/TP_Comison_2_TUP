import mysql from "mysql2";
import dotenv from "dotenv";


// Inicializo dotenv

dotenv.config();

// crea la conexion con la DB

const conexion = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
export default conexion;