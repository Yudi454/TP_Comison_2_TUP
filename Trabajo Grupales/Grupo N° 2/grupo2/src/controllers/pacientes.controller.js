import db  from '../config/db.js';

//Traer todos los pacientes

export const traerPacientes= async (req, res) => {
    try {
        const traerTodosLosPacientes =  'SELECT * FROM pacientes';
        db.query(traerTodosLosPacientes, (error, results) => {
            if (error) {
                console.error ("Error al traer los pacientes: ", error);
                res.status(500).json({ mensaje: 'Error al traer los pacientes' });
            } 
            res.status(200).json(results);
        });       
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

//Traer pacientes activos

export const traerPacientesActivos= async (req, res) => {
    try {
        const traerActivos= 'SELECT * FROM pacientes WHERE IsActive = 1';
        db.query(traerActivos, (error, results) => {
            if (error) {
                console.error ("Error al traer los pacientes activos: ", error);
                res.status(500).json({ mensaje: 'Error al traer los pacientes activos' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

//Trae pacientes inactivos

export const traerPacientesInactivos= async (req, res) => {
    try {
        const traerInactivos= 'SELECT * FROM pacientes WHERE IsActive = 0';
        db.query(traerInactivos, (error, results) => {
            if (error) {
                console.error ("Error al traer los pacientes inactivos: ", error);
                res.status(500).json({ mensaje: 'Error al traer los pacientes inactivos' });
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}
//Traer paciente por ID

export const traerPacientePorId= async (req, res) => {
    try {
        const { idPaciente } = req.params;
        const traerPorId = 'SLEECT * FROM pacientes WHERE idPaciente = ?';
        db.query(traerPorId, [idPaciente], (error, results) =>{
           if (error) {
                console.error("Error al traer el Paciente por ID: ", error);
                res.status(500).json({ message: "Error del servidor al traer el Paciente" });
            }
            if(results.length === 0){
                return res.status(404).json({ message: "Paciente no encontrado" });
            }
            res.status(200).json(results[0]);


        })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

//Crear paciente

export const crearPaciente= async (req, res) => {
    try {
        const {NombrePaciente, ApellidoPaciente,FechaNacPaciente,TelefonoPaciente,DireccionPaciente,SexoPaciente,idUsuario} = req.body;
         const nuevoPaciente = 'INSERT INTO pacientes (NombrePaciente, ApellidoPaciente,FechaNacPaciente,TelefonoPaciente,DireccionPaciente,SexoPaciente,idUsuario) VALUES (?,?,?,?,?,?,?)';
            db.query(nuevoPaciente, [NombrePaciente, ApellidoPaciente,FechaNacPaciente,TelefonoPaciente,DireccionPaciente,SexoPaciente,idUsuario], (error, results) => {
                if (error) {
                    console.error("Error al crear el paciente: ", error);
                    res.status(500).json({ mensaje: 'Error al crear el paciente' });
                }
                res.status(201).json({ mensaje: 'Paciente creado exitosamente', idInsertado: results.insertId });
            });
    } catch (error) {
        res.status(500).json({message: "Error del servidor"});
    }
}

//Actualizar datos del paciente

export const actualizarPaciente= async (req, res) => {
    try {
        const {idPaciente}= req.params;
        const {NombrePaciente,ApellidoPaciente,FechaNacPaciente,TelefonoPaciente,DireccionPaciente,SexoPaciente,idUsuario}= req.body;
        const actualizar= 'UPDATE pacientes SET NombrePaciente = ?, ApellidoPaciente = ?, FechaNacPaciente = ?, TelefonoPaciente = ?, DireccionPaciente = ?, SexoPaciente = ?, idUsuario = ? WHERE idPaciente = ?';
        db.query(actualizar, [NombrePaciente,ApellidoPaciente,FechaNacPaciente,TelefonoPaciente,DireccionPaciente,SexoPaciente,idUsuario,idPaciente], (error, results) => {
            if (error) {
                console.error("Error al actualizar el paciente: ", error);
                res.status(500).json({ mensaje: 'Error al actualizar el paciente' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Paciente no encontrado' });
            }
            res.status(200).json({ mensaje: 'Paciente actualizado exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

//Borrado logico del paciente

export const borradoLogicoPaciente= async (req, res) => {
    try {
        const { idPaciente } = req.params;
        const borradoLogico = 'UPDATE pacientes SET IsActive = 0 WHERE idPaciente = ?';
        db.query(borradoLogico, [idPaciente], (error, results) => {
            if (error) {
                console.error("Error al borrar el paciente: ", error);
                res.status(500).json({ mensaje: 'Error al borrar el paciente' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Paciente no encontrado' });
            }
            res.status(200).json({ mensaje: 'Paciente borrado exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}