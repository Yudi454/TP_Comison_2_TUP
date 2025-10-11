const express = require("express");
const { obtenerTodosProveedores, crearProveedor, actualizarProveedor, eliminarProveedor } = require("../controllers/proveedores.controller");

const router = express.Router();

router.get("/proveedor", obtenerTodosProveedores);
router.post("/proveedor", crearProveedor);
router.put("/proveedor", actualizarProveedor);
router.delete("/proveedor", eliminarProveedor);

module.exports = router;
