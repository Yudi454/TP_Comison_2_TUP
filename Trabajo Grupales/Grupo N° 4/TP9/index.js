require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const sociosRoutes = require('./routes/socios.routes');
// const deportesRoutes = require('./routes/deportes.routes');
// const asignacionesRoutes = require('./routes/asignaciones.routes');
// const pagosRoutes = require('./routes/pagos.routes');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// app.use('/api/socios', sociosRoutes);
// app.use('/api/deportes', deportesRoutes);
// app.use('/api/asignaciones', asignacionesRoutes);
// app.use('/api/pagos', pagosRoutes);

app.get('/', (req, res) => res.json({ msg: 'API Club Deportivo OK' }));

app.listen(process.env.PORT  , () =>
  console.log(`Servidor activo en puerto ${process.env.PORT  }`)
);
