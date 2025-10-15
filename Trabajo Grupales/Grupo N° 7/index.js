const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const serviciosRoutes = require('./routes/serviciosRoute.js');
const clientesRoutes = require('./routes/clientes.js');
const turnosRoutes = require('./routes/turnosRoutes.js');

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas
app.use('/clientes', clientesRoutes);
app.use('/servicios', serviciosRoutes);
app.use('/turnos', turnosRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
