const express = require("express")
const {connection} = require("./config/DB")
const cors = require('cors')
const routesProductos = require("./routes/producto.routes")
const routesUsuario = require("./routes/usuario.routes")
const routesProveedor = require("./routes/proveedores.routes")
const routesVenta = require("./routes/ventas.routes")
const routesMetricas = require("./routes/metricas.routes")


const app = express()

app.use(express.json())
app.use(cors())
app.use("/", routesProductos);
app.use("/", routesUsuario);
app.use("/", routesProveedor);
app.use("/", routesVenta);
app.use("/", routesMetricas);


app.get("/",(req,res)=>{
    res.send("TP 1 PRIETO JUAN MAXIMILIANO")
})

//Puerto de escucha

const PORT = process.env.PORT || 8000

app.listen(PORT,(err)=>{
    if(err) throw err
    console.log("escuchando en el puerto "+PORT)
})

//Conexion a la DB

connection.connect((err)=>{
    if(err) throw err
    console.log("conectado a mi DB")
})