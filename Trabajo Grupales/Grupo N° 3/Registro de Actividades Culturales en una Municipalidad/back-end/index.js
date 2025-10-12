const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const {connection} = require('./config/bd');

const app = express();

app.use(cors());
app.use(express.json());

//ROUTES RUTAS







//RUTA PRINNCIPAL 







//INICIAR SERVIDOR 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`el servidor esta inciiado en el puerto ${PORT}`)
});




