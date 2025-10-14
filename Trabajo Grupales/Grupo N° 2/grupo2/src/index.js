import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";


// Importamos las rutas creadas

//Inicializamos dotenv para llamar las variables de entorno

dotenv.config();

// conexion a la DB

db.connect((error) => {
  if (error) {
    console.log("Error de conexion a la DB");
    throw error;
  }
  console.log("Conexion a la DB exitosa");
});
const app = express();

//Middlewares
app.use(express.json());

//Configuracion del puerto

const PORT = process.env.PORT || 3000;

//middleware 
app.use(express.json());
//Rutas

//Inicializamos el servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
