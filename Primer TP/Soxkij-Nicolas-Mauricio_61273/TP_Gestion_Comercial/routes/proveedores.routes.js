const express = require("express");
const router = express.Router();
const { getTodosProveedores, getUnProveedor, setUnProveedor, updateProveedor, deleteProveedor } = require("../controllers/proveedores.controllers");


router.get("/", getTodosProveedores);
router.get("/:id", getUnProveedor);
router.post("/", setUnProveedor);
router.put("/:id", updateProveedor);
router.delete("/:id", deleteProveedor);

module.exports = router;
