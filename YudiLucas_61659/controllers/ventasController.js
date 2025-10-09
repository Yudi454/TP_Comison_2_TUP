const conection = require("../config/db");

//Traer ventas
const getAllVentas = (req, res) => {
  const consulta =
    "SELECT * FROM ventas v JOIN usuarios u ON v.id_vendedor = u.id_usuario WHERE estado = 1";

  conection.query(consulta, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al obtener todas las ventas" });
    }

    return res.json(results);
  });
};

//Traer una venta
const getOneVenta = (req, res) => {
  const { id } = req.params;

  const consulta = `SELECT * FROM ventas v 
    JOIN usuarios u ON v.id_vendedor = u.id_usuario
    JOIN detalle_venta dv ON dv.id_venta = v.id_venta
    JOIN productos p ON p.id_producto = dv.id_producto
    WHERE v.id_venta=?`;

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener la venta" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    return res.json(results);
  });
};

//Crear venta
const createVenta = (req, res) => {
  const { productos, ...ventaData } = req.body;

  const { fecha, total, id_vendedor } = ventaData;

  //Consulta para validar el vendedor
  const consultaVendedor =
    "SELECT COUNT(*) AS total FROM usuarios WHERE id_usuario=? ";

  conection.query(consultaVendedor, [id_vendedor], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Vendedor no encontrado" });
    }

    //Consulta para crear la venta
    const consultaVenta =
      "INSERT INTO ventas (fecha,total,id_vendedor) VALUES (?,?,?)";

    conection.query(
      consultaVenta,
      [fecha, total, id_vendedor],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Error al cargar la venta" });
        }

        //Traigo el id de la venta insertada
        const id_venta = results.insertId;

        let contador = 0;
        let errorOcurrido = false;

        productos.forEach((producto) => {
          //Si el error es true se corta
          if (errorOcurrido) return;

          //Constulta para agregar los detalles de la venta
          const consultaProducto =
            "INSERT INTO detalle_venta (id_venta,id_producto,cantidad,subtotal) VALUES (?,?,?,?)";

          const { id_producto, cantidad, precio } = producto;

          const subtotal = precio * cantidad;

          conection.query(
            consultaProducto,
            [id_venta, id_producto, cantidad, subtotal],
            (err, results) => {
              //Si no existe error y este es el 1 entra
              if (err && !errorOcurrido) {
                errorOcurrido = true;
                return res
                  .status(500)
                  .json({ message: "Error al crear el detalle de la venta" });
              }

              //Si no hay error suma al contador
              contador++;

              //Consulta para actualizar el stock
              const consultaStock =
                "UPDATE stock SET cantidad = cantidad - ? WHERE id_producto=?";

              conection.query(
                consultaStock,
                [cantidad, id_producto],
                (err, results) => {
                  //Si no existe error y es el 1 entra
                  if (err && !errorOcurrido) {
                    errorOcurrido = true;
                    return res
                      .status(500)
                      .json({ message: "Error al actualizar el stock" });
                  }
                }
              );

              //Si el contador es igual al numero de productos y no ocurrio ningun error
              if (contador === productos.length && !errorOcurrido) {
                return res
                  .status(201)
                  .json({ message: "Venta y detalles creados con éxito" });
              }
            }
          );
        });
      }
    );
  });
};

//Actualizar venta
const updateVenta = (req, res) => {
  const { id } = req.params;
  const { productos, ...ventaData } = req.body;
  const { fecha, total, id_vendedor } = ventaData;

  // Validar que el vendedor exista
  const consultaVendedor =
    "SELECT COUNT(*) AS total FROM usuarios WHERE id_usuario=?";

  conection.query(consultaVendedor, [id_vendedor], (err, results) => {
    if (err)
      return res.status(500).json({ message: "Error al buscar vendedor" });

    if (results[0].total === 0)
      return res.status(404).json({ message: "Vendedor no encontrado" });

    // Actualizar la venta
    const consultaVenta =
      "UPDATE ventas SET fecha=?, total=?, id_vendedor=? WHERE id_venta=?";

    conection.query(
      consultaVenta,
      [fecha, total, id_vendedor, id],
      (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Error al actualizar la venta" });

        let contador = 0;
        let errorOcurrido = false;

        productos.forEach((producto) => {
          if (errorOcurrido) return;

          const { id_producto, cantidad, precio } = producto;
          const subtotal = precio * cantidad;

          // Actualizar detalle si existe si no actualiza
          const consultaDetalle =
            "INSERT INTO detalle_venta (id,id_producto,cantidad,subtotal) VALUES (?,?,?,?) " +
            "ON DUPLICATE KEY UPDATE cantidad=?, subtotal=?";

          conection.query(
            consultaDetalle,
            [id, id_producto, cantidad, subtotal, cantidad, subtotal],
            (err, results) => {
              if (err && !errorOcurrido) {
                errorOcurrido = true;
                return res
                  .status(500)
                  .json({ message: "Error al actualizar detalle" });
              }

              contador++;

              const consultaStock =
                "UPDATE stock SET cantidad = cantidad - ? WHERE id_producto=?";

              conection.query(
                consultaStock,
                [cantidad, id_producto],
                (err, results) => {
                  if (err && !errorOcurrido) {
                    errorOcurrido = true;
                    return res
                      .status(500)
                      .json({ message: "Error al actualizar stock" });
                  }
                }
              );

              if (contador === productos.length && !errorOcurrido) {
                return res
                  .status(200)
                  .json({ message: "Venta y detalles actualizados con éxito" });
              }
            }
          );
        });
      }
    );
  });
};

//Eliminar venta
const deleteVenta = (req, res) => {
  const { id_venta } = req.params;

  // Cambiar estado de la venta
  const consultaVenta = "UPDATE ventas SET estado = 0 WHERE id_venta = ?";

  conection.query(consultaVenta, [id_venta], (err, results) => {
    if (err)
      return res.status(500).json({ message: "Error al actualizar la venta" });

    // Cambiar estado de los detalles
    const consultaDetalle =
      "UPDATE detalle_venta SET estado = 0 WHERE id_venta = ?";

    conection.query(consultaDetalle, [id_venta], (err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Error al actualizar los detalles" });

      return res
        .status(200)
        .json({ message: "Venta y detalles eliminados correctamente" });
    });
  });
};

const totalVentas = (req, res) => {
  const consulta =
    "SELECT SUM(total) AS total_ventas FROM ventas WHERE estado = 1";

  conection.query(consulta, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al traer el total de las ventas" });
    }

    return res.json(results);
  });
};

const ventasPorVendedor = (req, res) => {
  const { id_vendedor } = req.params;

  const consulta =
    "SELECT id_vendedor, COUNT(*) AS cantidad_ventas FROM ventas WHERE estado = 1 AND id_vendedor = ? GROUP BY id_vendedor";

  conection.query(consulta, [id_vendedor], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener las ventas" });
    }

    return res.json(results);
  });
};

//Traer ventas por fecha
const ventasPorFecha = (req, res) => {
  const { fecha } = req.body;

  const consulta =
    "SELECT DATE(fecha) AS dia, SUM(total) AS total_ventas FROM ventas WHERE estado = 1 AND DATE(fecha) = ? ";

  conection.query(consulta, [fecha], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al traer las ventas" });
    }

    return res.json(results);
  });
};

module.exports = {
  getAllVentas,
  getOneVenta,
  createVenta,
  updateVenta,
  deleteVenta,
  totalVentas,
  ventasPorVendedor,
  ventasPorFecha,
};
