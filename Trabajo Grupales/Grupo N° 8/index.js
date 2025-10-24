require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// inicializa la conexión (lee .env)
require("./config/DB");

const librosRoutes = require("./routes/libros");
const alumnosRoutes = require("./routes/alumnos");
const prestamosRoutes = require("./routes/prestamos");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// rutas reales
app.use("/libros", librosRoutes);
app.use("/alumnos", alumnosRoutes);
app.use("/prestamos", prestamosRoutes);

app.get("/ping", (req, res) => {
  const db = require("./config/DB");
  db.query("SELECT CURRENT_USER() AS user, DATABASE() AS db", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows[0]); // ej: { user: 'tp_user@localhost', db: 'tp_gc_db' }
  });
});

// raíz para que no dé 404 al entrar a /
app.get("/", (_req, res) => res.send("API Biblioteca OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
