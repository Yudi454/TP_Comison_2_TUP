import dotenv from 'dotenv';
import express from 'express';
import comedoresRoutes from './routes/comedores.route.js';

console.log('USER:', process.env.MYSQL_USER);
console.log('PASS:', process.env.MYSQL_PASS);
console.log('DB:', process.env.MYSQL_DATABASE);


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/comedores', comedoresRoutes);
app.use('/comedores/:id', comedoresRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

