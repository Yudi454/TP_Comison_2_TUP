const express = require("express");
const {
  getAllProveedores,
  getOneProveedor,
  deleteProveedor,
  updateProveedor,
  createProveedor,
} = require("../controllers/proveedoresController");

const router = express.Router()

//Traer todos los proveedores
router.get("/", getAllProveedores);

//Traer un proveedor
router.get("/:id", getOneProveedor);

//Eliminar proveedor
router.delete("/delete/:id", deleteProveedor);

//Actualizar proveedor
router.patch("/update/:id", updateProveedor);

//Crear proveedor
router.post("/create", createProveedor);

module.exports = router;
