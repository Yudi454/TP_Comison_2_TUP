const connection = require('../config/config'); // Ajusta la ruta según tu estructura



const mostrarActividades = (req, res) => {
    const consulta = "SELECT * FROM actividades";
    connection.query(consulta, (error, results) => {
        if (error) {
            console.error("Error al obtener las actividades:", error);
            res.status(500).json({ error: "Error al obtener las actividades" });
        } else {
            res.send(results);
        }
    });
};

const crearActividad = (req, res) => {
    const { nombre, descripcion, cupoMaximo } = req.body;
    const consulta = "INSERT INTO actividades (nombre, descripcion, cupoMaximo) VALUES (?, ?, ?)";
    connection.query(consulta, [nombre, descripcion, cupoMaximo], (error, results) => {
        if (error) {
            console.error("Error al crear la actividad:", error);
            res.status(500).json({ error: "Error al crear la actividad" });
        } else {
            res.status(201).json({ message: "Actividad creada exitosamente", id: results.insertId });
        }
    });
};

module.exports = { mostrarActividades, crearActividad };