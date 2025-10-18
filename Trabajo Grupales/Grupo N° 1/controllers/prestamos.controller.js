const db = require("../config/DB");

// Obtener todos los préstamos
exports.getAll = (req, res) => {
  db.query("SELECT * FROM prestamos", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// Obtener un préstamo por ID
exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM prestamos WHERE prestamo_id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (!rows.length) return res.status(404).json({ error: "No encontrado" });
      res.json(rows[0]);
    }
  );
};

// Crear un nuevo préstamo
exports.create = (req, res) => {
  const { alumno_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = req.body;
  db.query(
    "INSERT INTO prestamos (alumno_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES (?, ?, ?, ?, ?)",
    [alumno_id, libro_id, fecha_prestamo, fecha_devolucion || null, estado || 'prestado'],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        prestamo_id: result.insertId,
        alumno_id,
        libro_id,
        fecha_prestamo,
        fecha_devolucion: fecha_devolucion || null,
        estado: estado || 'prestado'
      });
    }
  );
};

// Actualizar un préstamo
exports.update = (req, res) => {
  const { alumno_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = req.body;
  db.query(
    "UPDATE prestamos SET alumno_id=?, libro_id=?, fecha_prestamo=?, fecha_devolucion=?, estado=? WHERE prestamo_id=?",
    [alumno_id, libro_id, fecha_prestamo, fecha_devolucion || null, estado || 'prestado', req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
      res.json({ ok: true });
    }
  );
};

// Eliminar un préstamo
exports.remove = (req, res) => {
  db.query("DELETE FROM prestamos WHERE prestamo_id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  });
};
