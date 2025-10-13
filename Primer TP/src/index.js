import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';
import cors from 'cors';
import usuarioRoutes from './routes/usuarios.routes.js'
import productoRoutes from './routes/productos.routes.js'
import proveedorRoutes from './routes/proveedores.routes.js'
import ventasRoutes from './routes/ventas.routes.js'

//confiurar el .env
dotenv.config();

//conectamos la base de datos
pool.getConnection((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

//rutas
app.use('/api/v1/usuarios', usuarioRoutes);
app.use('/api/v1/productos', productoRoutes);
app.use('/api/v1/proveedores', proveedorRoutes);
app.use('/api/v1/ventas', ventasRoutes);

//iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});