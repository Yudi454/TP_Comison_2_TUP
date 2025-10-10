import express from 'express';
import productosRoutes from './routes/productos.route.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/productos", productosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

