const db = require("../config/DB");


const getVentas = (req, res) => {
  const query = `
    SELECT v.id, v.nombre_cliente, v.total, v.fecha, u.nombre AS usuario_nombre, u.apellido AS usuario_apellido
    FROM ventas v
    LEFT JOIN usuarios u ON v.id_usuario = u.id
    ORDER BY v.fecha DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener ventas:", err);
      return res.status(500).json({ error: "Error al obtener ventas" });
    }
    res.json(results);
  });
};


const getVentaById = (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT v.id, v.nombre_cliente, v.total, v.fecha, u.nombre AS usuario_nombre, u.apellido AS usuario_apellido
    FROM ventas v
    LEFT JOIN usuarios u ON v.id_usuario = u.id
    WHERE v.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener venta:", err);
      return res.status(500).json({ error: "Error al obtener venta" });
    }
    if (results.length === 0) return res.status(404).json({ message: "Venta no encontrada" });
    res.json(results[0]);
  });
};


const createVenta = (req, res) => {
  const { nombre_cliente, total } = req.body;
  const query = "INSERT INTO ventas (nombre_cliente, total) VALUES (?, ?)";
  db.query(query, [nombre_cliente, total], (err, result) => {
    if (err) {
      console.error("Error al crear venta:", err);
      return res.status(500).json({ error: "Error al crear venta" });
    }
    res.status(201).json({ message: "Venta creada correctamente", id: result.insertId });
  });
};


const updateVenta = (req, res) => {
  const { id } = req.params;
  const { nombre_cliente, total } = req.body;
  const query = "UPDATE ventas SET nombre_cliente = ?, total = ? WHERE id = ?";
  db.query(query, [nombre_cliente, total, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar venta:", err);
      return res.status(500).json({ error: "Error al actualizar venta" });
    }
    if (result.affectedRows === 0) return res.status(404).json({ message: "Venta no encontrada" });
    res.json({ message: "Venta actualizada correctamente" });
  });
};


const deleteVenta = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM ventas WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar venta:", err);
      return res.status(500).json({ error: "Error al eliminar venta" });
    }
    if (result.affectedRows === 0) return res.status(404).json({ message: "Venta no encontrada" });
    res.json({ message: "Venta eliminada correctamente" });
  });
};

module.exports = { 
    getVentas, 
    getVentaById, 
    createVenta, 
    updateVenta, 
    deleteVenta };
