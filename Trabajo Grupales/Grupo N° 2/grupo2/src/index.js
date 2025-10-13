import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

// Importamos las rutas creadas
 import pacientesRoutes from './routes/pacientes.routes.js';
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

//Inicializamos express
const app = express();

//Configuracion del puerto

const PORT = process.env.PORT || 3000;

//Rutas
app.use("api/pacientes/v1", pacientesRoutes);
//Inicializamos el servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
