const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use('/api/eventos', require('./routes/eventos.routes'));
app.use('/api/artistas-eventos', require('./routes/artistas_eventos.routes'));

// RUTA PRINCIPAL
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido al Sistema de Gestión Cultural',
    endpoints: {
      eventos: '/api/eventos',
      artistas_eventos: '/api/artistas-eventos'
    }
  });
});

// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está iniciado en el puerto ${PORT}`);
});


