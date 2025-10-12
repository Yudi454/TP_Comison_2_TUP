import express from 'express';
import dotenv from 'dotenv';    
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import pool from "./src/config/db.js";
import usuarioRoutes from './src/routes/usuarios.routes.js';
import proveedoresRoutes from './src/routes/proveedores.routes.js';
import productosRoutes from './src/routes/productos.routes.js';
import stockRoutes from "./src/routes/stock.routes.js";
import ventasRoutes from "./src/routes/ventas.routes.js";
import metricasRoutes from "./src/routes/metricas.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/usuarios", usuarioRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/productos", productosRoutes);
app.use("/stock", stockRoutes);
app.use("/ventas", ventasRoutes);
app.use("/metricas", metricasRoutes);

(async () => {
    try {
        const conexion = await pool.getConnection();
        console.log("Conexion a MySQL exitosa");
        conexion.release();
    } catch (err) {
        console.error("Error al conectar la base de datos:", err.message);
    }
})();

app.get('/', (req, res) => {
    res.send("Servidor de gestion comercial corriendo");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));