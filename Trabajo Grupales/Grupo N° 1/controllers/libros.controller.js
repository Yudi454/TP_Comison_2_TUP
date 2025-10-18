const db = require("../config/DB");

// Obtener todos los libros
exports.getAll = (req, res) => {
  db.query("SELECT * FROM libros", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// Obtener un libro por ID
exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM libros WHERE libro_id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (!rows.length) return res.status(404).json({ error: "No encontrado" });
      res.json(rows[0]);
    }
  );
};

// Crear un nuevo libro
exports.create = (req, res) => {
  const { titulo, autor, categoria, ejemplares_disponibles } = req.body;
  db.query(
    "INSERT INTO libros (titulo, autor, categoria, ejemplares_disponibles) VALUES (?, ?, ?, ?)",
    [titulo, autor, categoria || null, ejemplares_disponibles || 0],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        libro_id: result.insertId,
        titulo,
        autor,
        categoria: categoria || null,
        ejemplares_disponibles: ejemplares_disponibles || 0
      });
    }
  );
};

// Actualizar un libro
exports.update = (req, res) => {
  const { titulo, autor, categoria, ejemplares_disponibles } = req.body;
  db.query(
    "UPDATE libros SET titulo=?, autor=?, categoria=?, ejemplares_disponibles=? WHERE libro_id=?",
    [titulo, autor, categoria || null, ejemplares_disponibles || 0, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
      res.json({ ok: true });
    }
  );
};

// Eliminar un libro
exports.remove = (req, res) => {
  db.query("DELETE FROM libros WHERE libro_id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  });
};
