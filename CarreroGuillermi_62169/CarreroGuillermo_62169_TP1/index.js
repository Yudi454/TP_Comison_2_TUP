import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Rutas
import usuariosRoutes from "./routes/usuarios.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import metricasRoutes from "./routes/metricas.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// 🧩 Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());                     // ✅ ESTA ES LA CLAVE
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 🛣️ Rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/proveedores", proveedoresRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/metricas", metricasRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
