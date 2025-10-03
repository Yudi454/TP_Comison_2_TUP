require("dotenv").config()
const express= require("express")
const cors= require("cors")
const conection= require("./config/db")
const helmet = require("helmet")

const app= express()

app.use(express.json())
app.use(cors())
app.use(helmet())

//ROUTES

const PORT= process.env.PORT || 8000

conection.connect((error)=>{
    if (error) throw error
    console.log("conectado a las base de datos")
})

app.listen(PORT, (error)=>{
    if(error) throw error
    console.log(`conectado a puerto ${PORT}`)
})