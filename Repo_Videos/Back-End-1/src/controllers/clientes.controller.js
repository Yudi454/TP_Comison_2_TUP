const {connection} = require('../config/config');

//fcion que muestre todos los clientes activarUsuario
const mostrarClientesActivos = (req, res) => {

    const queryClientesActivos = "SELECT * FROM Clientes WHERE activo = ?";
    connection.query(queryClientesActivos, [1], (error, results) => {
        if (error) {
            console.error("Error al obtener los clientes activos: ", error);
            res.status(500).json({ message: "Error al obtener los clientes activos" });
        }
        res.status(200).json(results);//array de objetos
    });
}

//fcion que muestre todos los clientes inactivas
const mostrarClientesInactivos = (req, res) => {
    const queryClientesInactivos = "SELECT * FROM Clientes WHERE activo = ?";
    connection.query(queryClientesInactivos, [0], (error, results) => {
        if (error) {
            console.error("Error al obtener los clientes inactivos: ", error);
            res.status(500).json({ message: "Error al obtener los clientes inactivos" });
        }
        res.status(200).json(results);
    });
};

//fcion que muestre cliente por id
const mostrarClientePorId = (req, res) => {
    const { id } = req.params;
    const queryClientePorId = "SELECT * FROM Clientes WHERE id = ?";
    connection.query(queryClientePorId, [id], (error, results) => {
        if (error) {
            console.error("Error al obtener el cliente por ID: ", error);
            res.status(500).json({ message: "Error al obtener el cliente por ID" });
        }
        res.status(200).json(results);
    });
};

//fcion que cree un cliente
const crearCliente = (req, res) => {
    const {nombre, apellido, DNI} = req.body;
    const queryCrearCliente = "INSERT INTO Clientes (nombre, apellido, DNI) VALUES (?, ?, ?)";
    connection.query(queryCrearCliente, [nombre, apellido, DNI], (error, results) => {
        if (error) {
            console.error("Error al crear un nuevo cliente: ", error);
            res.status(500).json({ message: "Error al crear un nuevo cliente" });
        }

        if(results.affectedRows === 0){
            return res.status(400).json({message: "No se pudo crear el cliente"});
        }
        res.status(201).json({ id: results.insertId, nombre, apellido, DNI });
    });
};

//fcion que actualice un cliente
const actualizarCliente = (req, res) => {
    const { id } = req.params;
    const {nombre, apellido, DNI} = req.body;
    const queryActualizarCliente = "UPDATE Clientes SET nombre = ?, apellido = ?, DNI = ? WHERE id = ?";
    connection.query(queryActualizarCliente, [nombre, apellido, DNI, id], (error, results) => {
        if (error) {
            console.error("Error al actualizar el cliente: ", error);
            res.status(500).json({ message: "Error al actualizar el cliente" });
        }
        res.status(200).json({ message: "Cliente actualizado exitosamente" });
    });
};  

//fcion que elimine un cliente (borrado fisico)
const eliminarCliente = (req, res) => {
    const { id } = req.params;
    const queryEliminarCliente = "DELETE FROM Clientes WHERE id = ?";
    connection.query(queryEliminarCliente, [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar el cliente: ", error);
            res.status(500).json({ message: "Error al eliminar el cliente" });
        }
        res.status(200).json({ message: "Cliente eliminado exitosamente" });
    });
}

//fcion que elimine un cliente (borrado logico)
const eliminarClienteLogico = (req, res) => {
    const { id } = req.params;
    const queryEliminarClienteLogico = "UPDATE Clientes SET activo = 0 WHERE id = ?";
    connection.query(queryEliminarClienteLogico, [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar logicamente el cliente: ", error);
            res.status(500).json({ message: "Error al eliminar logicamente el cliente" });
        }
        res.status(200).json({ message: "Cliente eliminado logicamente exitosamente" });
    });
}


//fcion que reactive un cliente (borrado logico)
const reactivarClienteLogico = (req, res) => {
    const { id } = req.params;
    const queryReactivarClienteLogico = "UPDATE Clientes SET activo = 1 WHERE id = ?";
    connection.query(queryReactivarClienteLogico, [id], (error, results) => {
        if (error) {
            console.error("Error al reactivar logicamente el cliente: ", error);
            res.status(500).json({ message: "Error al reactivar logicamente el cliente" });
        }
        res.status(200).json({ message: "Cliente reactivado logicamente exitosamente" });
    });
}

module.exports = {mostrarClientesActivos,mostrarClientesInactivos,mostrarClientePorId,crearCliente,actualizarCliente,eliminarCliente,eliminarClienteLogico,reactivarClienteLogico}