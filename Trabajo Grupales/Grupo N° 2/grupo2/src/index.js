import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

// Importamos las rutas creadas

import medicosRoutes from "./routes/medicos.routes.js";
import categoriasMedicoRoutes from "./routes/categoriaMedico.routes.js";
import turnoRoutes from "./routes/turnos.routes.js";
import pacientesRoutes from './routes/pacientes.routes.js';
import observacionesRoutes from "./routes/observaciones.routes.js";


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

//Middlewares
app.use(express.json());

//Configuracion del puerto

const PORT = process.env.PORT || 3000;

//Rutas

//Medicos y categorias
app.use("/api/medicos/v1", medicosRoutes);
app.use("/api/categoriasMedico/v1", categoriasMedicoRoutes);

//Turnos
app.use("/api/turnos/v1", turnoRoutes);
//Observaciones
app.use("/api/observaciones/v1", observacionesRoutes);

//Pacientes
app.use("/api/pacientes/v1", pacientesRoutes);

//Inicializamos el servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
