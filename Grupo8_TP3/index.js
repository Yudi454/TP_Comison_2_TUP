const express = require("express");
const {connection} = require("./config/database");
const routersProductos = require("./routes/productos")
const dotenv = require("dotenv");

dotenv.config();

const app= express();

app.use(express.json());

app.use("/productos", routersProductos)



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