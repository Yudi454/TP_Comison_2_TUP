import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";

// importamos las rutas creadas
import usuariosRoutes from "./routes/user.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import productosRoutes from "./routes/pruductos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";

// iniciamos dotenv para llamar las variables
dotenv.config();

// creo la conexion con la db

db.getConnection((err) => {
  if (err) {
    console.error("Error de conexion:", err);
    return;
  }
  console.log("Conexion a la DB exitosa");
});

// Inicializar express

const app = express();

// configuraciones cors

// Configuracion del PUERTO

const PORT = process.env.PORT || 3000;
// middlewares

app.use(express.json());

// rutas
// Rutas para usuarios
app.use("/api/usuarios/v1", usuariosRoutes);

// Rutas para proveedores
app.use("/api/proveedores/v1", proveedoresRoutes);
// Rutas para productos
app.use("/api/productos/v1", productosRoutes);
// Rutas para ventas
app.use("/api/ventas/v1", ventasRoutes);


// Inicializamos el servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
