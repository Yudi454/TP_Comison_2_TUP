import express from 'express';

import migrationRoutes from './routes/migration.route.js';
import donadoresRoutes from './routes/donadores.route.js';
import productosRoutes from './routes/productos.route.js';


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());


app.use('/api/migration/', migrationRoutes);
app.use('/api/donadores/', donadoresRoutes);
app.use("/api/productos", productosRoutes);


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});