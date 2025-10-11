const express = require('express');
const app = express();

// Middleware para leer JSON
app.use(express.json());

// Importamos rutas
const usuariosRoutes = require('./routes/usuarios.routes');

// Usamos rutas con prefijo
app.use('/api/usuarios', usuariosRoutes);

// Iniciamos servidor
app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));
