const db = require("../config/DB");

// Obtener todos los alumnos
exports.getAll = (req, res) => {
  db.query("SELECT * FROM alumnos", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// Obtener un alumno por ID
exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM alumnos WHERE alumno_id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (!rows.length) return res.status(404).json({ error: "No encontrado" });
      res.json(rows[0]);
    }
  );
};

// Crear un nuevo alumno
exports.create = (req, res) => {
  const { nombre, curso, dni } = req.body;
  db.query(
    "INSERT INTO alumnos (nombre, curso, dni) VALUES (?, ?, ?)",
    [nombre, curso || null, dni],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        alumno_id: result.insertId,
        nombre,
        curso: curso || null,
        dni
      });
    }
  );
};

// Actualizar un alumno
exports.update = (req, res) => {
  const { nombre, curso, dni } = req.body;
  db.query(
    "UPDATE alumnos SET nombre=?, curso=?, dni=? WHERE alumno_id=?",
    [nombre, curso || null, dni, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
      res.json({ ok: true });
    }
  );
};

// Eliminar un alumno
exports.remove = (req, res) => {
  db.query("DELETE FROM alumnos WHERE alumno_id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  });
};
