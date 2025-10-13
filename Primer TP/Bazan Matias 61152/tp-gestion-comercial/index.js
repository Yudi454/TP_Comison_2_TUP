import express from 'express';
import dotenv from 'dotenv';
import db from './config/DB.js';

// Importamos las rutas creadas 

import usuarioRoutes from './routes/usuarios.routes.js';
import proveedorRoutes from './routes/proveedores.routes.js';
import productoRoutes from './routes/productos.routes.js';
import ventaRoutes from './routes/ventas.routes.js';


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

//Inicializamos la configuracion de cors

//Configuracion del puerto 

const PORT= process.env.PORT || 3000;

// Middlewarees

app.use(express.json());

//Rutas

app.use("/api/usuarios/v1", usuarioRoutes);
app.use("/api/proveedores/v1", proveedorRoutes);
app.use("/api/productos/v1", productoRoutes);
app.use("/api/ventas/v1", ventaRoutes);


//Inicializamos el servidor

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})