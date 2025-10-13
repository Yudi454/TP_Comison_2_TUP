require("dotenv").config()
const express= require("express")
const cors= require("cors")
const conection= require("./config/database")
const helmet = require("helmet")

const RoutesProveedores=require("./routes/proveedoresRouter")

const app= express()

app.use(express.json())
app.use(cors())
app.use(helmet())

//Routes
app.use("/proveedores",RoutesProveedores)

const PORT= process.env.PORT || 8000

conection.connect((error)=>{
    if (error) throw error
    console.log("conectado a las base de datos")
})

app.listen(PORT, (error)=>{
    if(error) throw error
    console.log(`conectado a puerto ${PORT}`)
})
