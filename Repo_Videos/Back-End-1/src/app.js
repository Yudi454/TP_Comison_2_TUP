//Aqui realizo las configuraciones principales del servidor

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes =  require('./routes/index'); // importa las rutas desde el archivo index.js en la carpeta routes

const app = express();// crea una instancia de la aplicación Express

app.use(cors()); // habilita CORS para permitir solicitudes desde otros dominios
app.use(morgan('dev')); // registra las solicitudes HTTP en la consola
app.use(express.json()); // analiza el cuerpo de las solicitudes JSON
app.use(express.urlencoded({ extended: true })); // analiza el cuerpo de las solicitudes URL-encoded

app.use('/api', routes);// monta las rutas importadas en la ruta base /api
///api/clientes, /api/productos, /api/ventas, /api/usuarios, /api/login, /api/detalles-venta

// Rutas
app.get("/", (req, res) => {
    res.send("Bienvenido a la API Principal");
});

module.exports = app;