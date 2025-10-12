const express = require("express");
const router = express.Router();
const { getTotalProductos, getUnProducto, setUnProducto, updateProducto, deleteProducto } = require("../controllers/productos.controllers");

router.get("/", getTotalProductos);    // GET /api/productos
router.get("/:id", getUnProducto);    // GET /api/productos/:id
router.post("/", setUnProducto);      // POST /api/productos
router.put("/:id", updateProducto);   // PUT /api/productos/:id
router.delete("/:id", deleteProducto);// DELETE /api/productos/:id

module.exports = router;
