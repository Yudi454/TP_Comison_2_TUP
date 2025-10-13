const express = require("express")
const Routes=express.Router()

const {getAllProveedores,getProveedores,createProveedores,updateProveedores,deleteProveedores}=require("./../controllers/proveedoresControllers")

Routes.get("/",getAllProveedores)
Routes.get("/buscador",getProveedores)
Routes.post("/create",createProveedores)
Routes.put("/update/:id",updateProveedores)
Routes.delete("/delete/:id",deleteProveedores)

module.exports=Routes