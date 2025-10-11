import db from "../config/DB.js";

//Traer todos los proveedores

export const traerProveedores = async (req, res) => {
    try {
        const traerTodosLosProveedores = 'SELECT * FROM proveedores';
        db.query(traerTodosLosProveedores, (error, results) => {
            if (error) {
                console.error("Error al traer los Proveedores: ", error);
                res.status(500).json({ message: "Error del sarvidor al traer los Proveedores" });
            }
            res.status(200).json(results);
        })

    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
};

// filtro para traer proveddores activos
export const traerPorveedoresActivos = async (req, res) => {
    try {
        const activos = 'SELECT * FROM proveedores WHERE isActive = 1';
        db.query(activos, (error, results) => {
            if (error) {
                console.error("Error al traer los proveedores activos: ", error);
                res.status(500).json({ message: "Error del sarvidor al traer los proveedores activos" });
            }
            res.status(200).json(results);
        })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
}

// creacion de proveedores 

export const crearProveedor = async (req, res) => {
    try {

        //traer los datos del body
        const {
            nombreProveedor,
            direccionProveedor,
            telefonoProveedor,
        } = req.body;

        const nuevoProveedor = "INSERT INTO proveedores (nombreProveedor, direccionProveedor, telefonoProveedor) VALUES (?, ?, ?)";

        db.query(nuevoProveedor, [nombreProveedor, direccionProveedor, telefonoProveedor], (error, results) => {
            if (error) {
                console.error("Error al crear el Proveedor: ", error);
                res.status(500).json({ message: "Error del sarvidor al crear el Proveedor" });
            }
            res.status(201).json({ message: "Proveedor creado con exito" });
            idInsertado: results.insertId
        })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });

    }
};

//Actualizar Proveedor

export const actualizarProveedor = async (req, res) => {
    try {

        const { idProveedor } = req.params;
        //traer los datos del body
        const {
            nombreProveedor,
            direccionProveedor,
            telefonoProveedor,
        } = req.body;

        const actualizar = "UPDATE proveedores SET nombreProveedor = ?, direccionProveedor = ?, telefonoProveedor = ? WHERE idProveedor = ?";

        db.query(actualizar, [nombreProveedor, direccionProveedor, telefonoProveedor, idProveedor], (error, results) => {
            if (error) {
                console.error("Error al actualizar el Proveedor: ", error);
                res.status(500).json({ message: "Error del sarvidor al actualizar el Proveedor" });
            }
            res.status(201).json({ message: "Proveedor actualizado con exito" });

        })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });

    }
};

//Borrado logico de proveedores para no afectar las realciones entre tablas

export const borradoLogicoProveedor = async (req, res) => {
    try {
        const { idProveedor } = req.params;
        const borradoLogico = "UPDATE proveedores SET isActive = 0 WHERE idProveedor = ?";
        db.query(borradoLogico, [idProveedor], (error, results) => {
            if (error) {
                console.error("Error al eliminar el Proveedor: ", error);
                res.status(500).json({ message: "Error del sarvidor al eliminar el Proveedor" });
            }
            res.status(201).json({ message: "Proveedor eliminado con exito" });

        })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });

    }
}
