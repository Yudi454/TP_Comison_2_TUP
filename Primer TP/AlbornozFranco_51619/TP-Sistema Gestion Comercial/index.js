const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// 1. Configuracion y conexion a la base de datos
const { testConnection } = require('./config/db');

//  2. Importacion de Rutas 
const usuariosRoutes = require('./routes/usuarios.routes');
const proveedoresRoutes = require('./routes/proveedores.routes');
const productosRoutes = require('./routes/productos.routes');
const ventasRoutes = require('./routes/ventas.routes');
const metricasRoutes = require('./routes/metricas.routes');


const app = express();
const PORT = process.env.PORT || 3000;

//  3. Middlewares Obligatorios y Sugeridos 
app.use(helmet()); // Seguridad basica
app.use(cors());   // Permitir peticiones de otros dominios
app.use(morgan('dev')); // Logging de peticiones HTTP (sugerido)
app.use(express.json()); // Permite a Express leer el cuerpo de las peticiones en formato JSON

//  4. Montaje de Rutas 
// Montamos cada router en su path base: /api/[nombre]
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/metricas', metricasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Gestion Comercial en funcionamiento.');
});

//  5. Inicio del Servidor 

testConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`👌Servidor corriendo en http://localhost:${PORT}`);
    });
});