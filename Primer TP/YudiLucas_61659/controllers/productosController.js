const conection = require("../config/db");

//Traer todos los productos
const getAllProductos = (req, res) => {
  const consulta = "SELECT * FROM productos WHERE estado = 1";

  conection.query(consulta, (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error al obtener los productos" });
    }

    return res.json(results);
  });
};

//Traer un producto
const getOneProducto = (req, res) => {
  const { id } = req.params;

  const consulta = "SELECT * FROM productos WHERE id_producto = ?";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener el producto" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Producto no encontraado" });
    }

    return res.json(results[0]);
  });
};

//Borrar producto
const deleteProducto = (req, res) => {
  const { id } = req.params;

  const consulta = "UPDATE productos SET estado = 0 WHERE id_producto = ?";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al eliminar el producto" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const actualizarStock =
      "UPDATE stock SET estado = 0 WHERE id_producto=?";

    conection.query(actualizarStock, [id], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar el stock" });
      }

      return res.status(200).json({
        message: "Producto eliminado y stock actualizado correctamente ",
      });
    });
  });
};

//Actualizar producto
const updateProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, precio, id_proveedor } = req.body;

  const consultaProveedor =
    "SELECT id_proveedor FROM proveedores WHERE id_proveedor=?";

  conection.query(consultaProveedor, [id_proveedor], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al buscar proveedor" });
    }

    if (results.length > 0) {
      const consultaActualizar =
        "UPDATE productos SET id_proveedor=?, nombre=?, precio=? WHERE id_producto=?";

      conection.query(
        consultaActualizar,
        [id_proveedor, nombre, precio, id],
        (err, results) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al actualizar el producto" });
          }

          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ message: "Producto no encontrado para actualizar" });
          }

          return res
            .status(200)
            .json({ message: "Producto actualizado con éxito" });
        }
      );
    } else {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
  });
};

//Crear producto
const createProducto = (req, res) => {
  const { id_proveedor, nombre, precio, cantidad } = req.body;

  const consultaProveedor =
    "SELECT id_proveedor FROM proveedores WHERE id_proveedor=?";

  conection.query(consultaProveedor, [id_proveedor], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al buscar ell proveedor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    const consultaProducto =
      "INSERT INTO productos (id_proveedor,nombre,precio) VALUES (?,?,?)";

    conection.query(
      consultaProducto,
      [id_proveedor, nombre, precio],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error al crear el producto" });
        }

        const idProductoCreado = results.insertId;
        const consultaStock =
          "INSERT INTO stock (id_producto,cantidad) VALUES (?,?)";

        conection.query(
          consultaStock,
          [idProductoCreado, cantidad || 1],
          (err, results) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error al crear el stock" });
            } else {
              return res
                .status(201)
                .json({ message: "Producto y stock creado con exito" });
            }
          }
        );
      }
    );
  });
};

//Productos mas vendidos
const productosMasVendidos = (req, res) => {
  const consulta =
    "SELECT p.nombre, SUM(dv.cantidad) AS total_vendido FROM detalle_venta dv JOIN productos p ON dv.id_producto = p.id_producto WHERE dv.estado = 1 GROUP BY dv.id_producto ORDER BY total_vendido DESC";

  conection.query(consulta, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al traer los productos" });
    }

    return res.json(results);
  });
};

//Stock actual de un producto
const stockPorProducto = (req, res) => {
  const { id } = req.params;

  const consulta =
    "SELECT p.nombre, s.cantidad FROM stock s JOIN productos p ON s.id_producto = p.id_producto WHERE s.estado = 1 AND s.id_producto = ?";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al traer el stock" });
    }

    return res.json(results);
  });
};

module.exports = {
  getAllProductos,
  getOneProducto,
  updateProducto,
  deleteProducto,
  createProducto,
  productosMasVendidos,
  stockPorProducto
};
