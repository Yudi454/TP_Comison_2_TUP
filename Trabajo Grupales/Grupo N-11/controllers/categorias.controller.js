const { connection } = require("../config/DB");

const getCategorias = (req, res) => {
    const query = "SELECT * FROM categorias WHERE activo_categoria = 1";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener las categorías", details: err.message });
        }
        res.json(results);
    });
}
const crearCategoria = (req, res) => {
    const { nombre_categoria } = req.body;
    const query = "INSERT INTO categorias (nombre_categoria) VALUES (?)";
    connection.query(query, [nombre_categoria], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al crear la categoría", details: err.message });
        }   
    }
    );
    res.status(201).json({ message: "Categoría creada con éxito", id_categoria: results.insertId });
}