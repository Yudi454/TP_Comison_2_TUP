const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {connection} = require('./config/bd')


// INICIALIZAR EXPRESS 
const app = express();
app.use(cors());
app.use(express.json());



//RUTAS / ROUTES






//RUTA PRICIPAL






// INCIAR SERVIDOR 

const PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`el servidor esta inciiado en el puerto ${PORT}`)
});

