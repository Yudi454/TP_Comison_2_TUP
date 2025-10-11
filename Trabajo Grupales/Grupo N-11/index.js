const express = require('express');
const {connection} = require("./config/DB")
const routesUsuario = require("./routes/usuarios.routes")
const cors = require('cors')


const app = express();

app.use(express.json())
app.use(cors())
app.use("/", routesUsuario);

app.get("/",(req,res)=>{
    res.send(" PRIETO JUAN MAXIMILIANO - GRUPO 11")
})



const PORT = process.env.PORT || 8000

app.listen(PORT,(err)=>{
    if(err) throw err
    console.log("escuchando en el puerto "+PORT)
})



connection.connect((err)=>{
    if(err) throw err
    console.log("conectado a mi DB")
})