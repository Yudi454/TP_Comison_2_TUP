// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { conection } = require("./config/DB");  // 🔹 Acá la llamás

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const rutasActividades = require("./routes/actividades.routes");
const rutasReservas = require("./routes/routes.reservas");
const rutasSocios = require("./routes/socios.routes");

app.use("/api/actividades", rutasActividades);
app.use("/api/reservas", rutasReservas);
app.use("/api/socios", rutasSocios);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
