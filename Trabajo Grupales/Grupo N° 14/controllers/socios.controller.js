const  connection  = require("../config/config")

const getAllSocios = (req, res) => {

    const consulta = "select * from socios";

    connection.query(consulta, (error, results) => {
        if (error) {
            console.error("Error al obtener los socios:", error);
            res.status(500).json({ error: "Error al obtener los socios" });
        } else {
            res.send(results);
        }
    });
};

const crearSocio = (req, res) => {
    const { nombre, apellido, mail, telefono, fechaNacimiento } = req.body;

    const consulta = "INSERT INTO socios (nombre, apellido, mail, telefono, fechaNacimiento) VALUES (?, ?, ?, ?, ?)";

    connection.query(consulta, [nombre, apellido, mail, telefono, fechaNacimiento], (error, results) => {
        if (error) {
            console.error("Error al crear el socio:", error);
            res.status(500).json({ error: "Error al crear el socio" });
        } else {
            res.status(201).json({ message: "Socio creado exitosamente", id: results.insertId });
        }
    });
};

module.exports = { getAllSocios, crearSocio };