import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';

// Importamos las rutas creadas 


//Inicializamos dotenv para llamar las variables de entorno

dotenv.config();

//Creamos la conexion a la DB
db.getConnection((error)=>{ //getConnection se utiza para verificar la conexion a la DB
    if(error){
        console.log("error de conexion a la DB: ", error);
        return
    }
    console.log("Conexion a la DB exitosa");
});


//Inicializamos express

const app = express();

//Configuracion del puerto 

const PORT= process.env.PORT || 3000;

//Rutas



//Inicializamos el servidor

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})