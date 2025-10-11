const express = require("express")

const { getAllProducts, deleteProduct, createProduct, updateProduct} = require("../controllers/productos.controller");

const router = express.Router()

router.get("/productos",getAllProducts);
router.delete("/productos",deleteProduct);
router.post("/productos",createProduct);
router.put("/productos",updateProduct);
module.exports = router