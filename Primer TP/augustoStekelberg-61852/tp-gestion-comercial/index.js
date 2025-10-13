require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(morgan('dev'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/proveedores', require('./routes/proveedores.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/ventas', require('./routes/ventas.routes'));
app.use('/api/metricas', require('./routes/metricas.routes'));

// Ruta base
app.get('/', (req, res) => {
    res.json({ mensaje: 'API de SGC funciona' });
});

// 404 genérico
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
