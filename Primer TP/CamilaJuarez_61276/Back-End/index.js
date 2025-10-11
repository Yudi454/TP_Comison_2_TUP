const express = require ("express");
const {connection} = require("./config/DB");
const routesProducts = require("./routes/producto");
const routesProveedores = require("./routes/proveedor")
const routesUsuarios = require("./routes/usuarios")
const routesVentas = require("./routes/ventas")
const routesStock = require("./routes/stock")
const dotenv = require("dotenv");

dotenv.config();

const app= express();

app.use(express.json());

app.use("/productos",routesProducts)
app.use("/proveedores", routesProveedores)
app.use("/usuarios" ,routesUsuarios)
app.use("/ventas" , routesVentas)
app.use("/stock" , routesStock)



app.get("/",(req,res)=>{
    res.send("Back funcionando")
});

const PORT = process.env.PORT || 8000;

connection.connect((err)=>{
     if (err) throw err
     console.log("conectado a mi DB")
});



app.listen(PORT,(err)=>{
    if(err) throw err
    console.log("escuchando en el puerto " + PORT);
});