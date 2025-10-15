const express = require('express');

const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const ventaRoutes = require('./routes/ventaRoutes');


const app = express();


app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/productos', productoRoutes);
app.use('/ventas', ventaRoutes);

app.listen(8000, () => {
  console.log('Servidor corriendo en puerto 8000');
});
