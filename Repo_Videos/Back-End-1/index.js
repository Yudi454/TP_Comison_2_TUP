const express = require("express")
const {connection} = require('./config/config');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/usuarios.routes');

dotenv.config();// traigo las variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Middleware para parsear JSON
app.use("/", usuarioRoutes);

// Conectar a la base de datos
connection.connect((error) => {
    if (error) {
        console.error("Error de conexion a la base de datos: ", error);
        return;
    }
    console.log("Conexion a la base de datos exitosa");
});
// Rutas
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de Usuarios");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});