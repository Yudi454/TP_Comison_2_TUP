const expres = require("express");
const {
  getAllProductos,
  getOneProducto,
  updateProducto,
  deleteProducto,
  createProducto,
  productosMasVendidos,
  stockPorProducto
} = require("../controllers/productosController");

const router = expres.Router;

//Traer todos los productos
router.get("/", getAllProductos);

//Traer un producto
router.get("/:id", getOneProducto);

//Eliminar producto
router.delete("/delete/:id", deleteProducto);

//Actualizar producto
router.patch("/update/:id", updateProducto);

//Crear producto
router.post("/create", createProducto);

// Productos más vendidos
router.get("/mas-vendidos", productosMasVendidos);

// Stock de un producto
router.get("/stock/:id", stockPorProducto);

module.exports = router;
