
const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use(express.json());
app.use('/usuarios', usuariosRoutes);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));




const proveedoresRoutes = require('./routes/proveedores.routes');
app.use('/proveedores', proveedoresRoutes);


const metricasRoutes = require('./routes/metricas.routes');
app.use('/metricas', metricasRoutes);
const ventasRoutes = require('./routes/ventas.routes');
app.use('/ventas', ventasRoutes);
const productosRoutes = require('./routes/productos.routes');
app.use('/productos', productosRoutes);
