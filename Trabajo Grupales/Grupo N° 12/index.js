import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./config/DB.js";

import sociosRoutes from "./routes/socios.routes.js";
import deportesRoutes from "./routes/deportes.routes.js";
import membresiasRoutes from "./routes/membresias.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/socios", sociosRoutes);
app.use("/api/deportes", deportesRoutes);
app.use("/api/membresias", membresiasRoutes);
app.use("/api/reportes", reportesRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
