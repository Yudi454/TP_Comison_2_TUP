require("dotenv").config()
const express= require("express")
const cors= require("cors")
const conection= require("./config/db")

const app= express()

app.use(express.json())
app.use(cors())

//ROUTES

const PROT= process.env.PROT || 8000

