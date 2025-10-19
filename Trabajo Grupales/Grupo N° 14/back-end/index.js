import express from "express";
import cors from "cors";
import artistasRoutes from "./routes/artistasRoutes.js";
import asistentesRoutes from "./routes/asistentesRoutes.js";
import eventosRoutes from "./routes/eventosRoutes.js";
import eventoArtistaRoutes from "./routes/eventoArtistaRoutes.js"; 
import inscripcionesRoutes from "./routes/inscripcionesRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api/artistas", artistasRoutes);
app.use("/api/asistentes", asistentesRoutes);
app.use("/api/eventos", eventosRoutes);
app.use("/api/evento_artista", eventoArtistaRoutes);
app.use("/api/inscripciones",inscripcionesRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
