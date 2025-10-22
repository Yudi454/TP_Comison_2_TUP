require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// inicializa la conexión (lee .env)
require("./src/config/DB");

const librosRoutes = require("./src/routes/libros");
const alumnosRoutes = require("./src/routes/alumnos");
const prestamosRoutes = require("./src/routes/prestamos");
const mailRoutes = require("./src/routes/mail.routes");
const authRoutes = require("./src/routes/auth.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// rutas reales
app.use("/libros", librosRoutes);
app.use("/alumnos", alumnosRoutes);
app.use("/prestamos", prestamosRoutes);
app.use("/mail", mailRoutes);
app.use("/auth", authRoutes);

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
