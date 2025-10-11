const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

//Importación de la Conexión DB 
const { testConnection } = require('./config/DB');

// Importación de Rutas 
const usuariosRoutes = require('./routes/usuarios.routes');
const proveedoresRoutes = require('./routes/proveedores.routes');
const productosRoutes = require('./routes/productos.routes');
const ventasRoutes = require('./routes/ventas.routes');
const metricasRoutes = require('./routes/metricas.routes');


const app = express();
const PORT = process.env.PORT || 3000;

//  Middlewares 
app.use(helmet()); // Seguridad 
app.use(cors());   // Permitir peticiones de otros dominios
app.use(morgan('dev')); // Logging de peticiones HTTP
app.use(express.json()); // Permite a Express leer el cuerpo de las peticiones en formato JSON

//  Montaje de Rutas 
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/metricas', metricasRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Gestión Comercial en funcionamiento.');
});

// Inicio del Servidor
//  probamos la conexión a la base de datos
testConnection().then(() => {
    // Si la conexión es exitosa, iniciamos el servidor
    app.listen(PORT, () => {
        console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
});