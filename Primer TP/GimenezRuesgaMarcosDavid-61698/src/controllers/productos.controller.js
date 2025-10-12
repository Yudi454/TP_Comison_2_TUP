import db from "../config/db.js";

// Traer todos los productos

export const traerProductos = async (req, res) => {
  try {
    const traerTodosLosProductos = `SELECT * FROM productos`;
    db.query(traerTodosLosProductos, (error, results) => {
      if (error) {
        console.error(" Error al traer los productos", error);
        return res.status(500).json({
          message: "Error al traer los productos",
        });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
// traer productos activos

export const traerProductosActivos = async (req, res) => {
  try {
    const activos = `SELECT * FROM productos WHERE isActive = 1`;
    db.query(activos, (error, results) => {
      if (error) {
        console.error("Error al traer productos activos", error);
        return res.status(500).json({
          message: "Error al traer productos activos",
        });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

// Crear productos
export const crearProducto = async (req, res) => {
  try {
    // traer los datos del body
    const {
      nombreProducto,
      codigoProducto,
      precioCompraProducto,
      precioVentaProducto,
      stockProducto,
      descripcionProducto,
      idProveedor,
    } = req.body;

    const nuevoProducto = `INSERT INTO productos (nombreProducto, codigoProducto, precioCompraProducto, precioVentaProducto, stockProducto, descripcionProducto, idProveedor) VALUES (?,?,?,?,?,?,?)`;

    db.query(
      nuevoProducto,
      [
        nombreProducto,
        codigoProducto,
        precioCompraProducto,
        precioVentaProducto,
        stockProducto,
        descripcionProducto,
        idProveedor,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al crear el producto", error);
          return res.status(500).json({
            message: "Error al crear el producto",
            error: error.message,
          });
        }
        res.status(201).json({
          message: "Producto creado exitosamente",
          idInsertado: results.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

// Actualizar producto

export const actualizarProducto = async (req, res) => {
  try {
    const { idProducto } = req.params;
    // traer los datos del body
    const {
      nombreProducto,
      codigoProducto,
      precioCompraProducto,
      precioVentaProducto,
      stockProducto,
      descripcionProducto,
      idProveedor,
    } = req.body;
    const actualizar = `UPDATE productos SET nombreProducto = ?, codigoProducto = ?, precioCompraProducto = ?, precioVentaProducto = ?, stockProducto = ?, descripcionProducto = ?, idProveedor = ? WHERE idProducto = ?`;
    db.query(
      actualizar,
      [
        nombreProducto,
        codigoProducto,
        precioCompraProducto,
        precioVentaProducto,
        stockProducto,
        descripcionProducto,
        idProveedor,
        idProducto,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al actualizar el producto", error);
          return res.status(500).json({
            message: "Error al actualizar el producto",
          });
        }
        res.status(200).json({
          message: "Producto actualizado exitosamente",
        });
      }
    );
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

// Borrado logico de producto
export const borradoLogicoProducto = async (req, res) => {
  try {
    const { idProducto } = req.params;
    const borrar = `UPDATE productos SET isActive = 0 WHERE idProducto = ?`;
    db.query(borrar, [idProducto], (error, results) => {
      if (error) {
        console.error("Error al eliminar el producto", error);
        return res.status(500).json({
          message: "Error al eliminar el producto",
        });
      }
      res.status(200).json({
        message: "Producto eliminado exitosamente",
      });
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
