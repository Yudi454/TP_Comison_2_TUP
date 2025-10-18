import db from '../config/db.js';

export const obtenerMedicos = async (req, res) => {
    try {
        const obtenerListadoMedicos = 'SELECT * FROM medicos';
        db.query(obtenerListadoMedicos, (error, results) => {
            if (error) {
                console.error('Error al obtener los medicos:', error);
                res.status(500).json({ error: 'Error al obtener los medicos' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener los medicos:', error);
        res.status(500).json({ error: 'Error al obtener los medicos' });
    }};

export const obtenerMedicoPorId = async (req, res) => {
    try {
        const { idMedico } = req.params;
        const obtenerMedico = 'SELECT * FROM medicos WHERE idMedico = ?';
        db.query(obtenerMedico, [idMedico], (error, results) => {
            if (error) {
                console.error('Error al obtener el medico:', error);
                res.status(500).json({ error: 'Error al obtener el medico' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener el medico:', error);
        res.status(500).json({ error: 'Error al obtener el medico' });
    }
};

export const crearMedico = async (req, res) => {
    try {
        const { NombreMedico, ApellidoMedico, FechaNacMedico, TelefonoMedico, DireccionMedico, LocalidadMedico, SalarioMedico, idCatMedico } = req.body;
        const nuevoMedico = 'INSERT INTO medicos (NombreMedico, ApellidoMedico, FechaNacMedico, TelefonoMedico, DireccionMedico, LocalidadMedico, SalarioMedico, idCatMedico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(nuevoMedico, [NombreMedico, ApellidoMedico, FechaNacMedico, TelefonoMedico, DireccionMedico, LocalidadMedico, SalarioMedico, idCatMedico], (error, results) => {
            if (error) {
                console.error('Error al crear el medico:', error);
                res.status(500).json({ error: 'Error al crear el medico' });
                return;
            }
            res.status(201).json({ message: 'Medico creado exitosamente', idMedico: results.insertId });
        });
    } catch (error) {
        console.error('Error al crear el medico:', error);
        res.status(500).json({ error: 'Error al crear el medico' });
    }
};

export const modificarMedico = async (req, res) => {
    try {
        const { idMedico } = req.params;
        const { NombreMedico, ApellidoMedico, FechaNacMedico, TelefonoMedico, DireccionMedico, LocalidadMedico, SalarioMedico, idCatMedico } = req.body;
        const actualizarMedico = 'UPDATE medicos SET NombreMedico = ?, ApellidoMedico = ?, FechaNacMedico = ?, TelefonoMedico = ?, DireccionMedico = ?, LocalidadMedico = ?, SalarioMedico = ?, idCatMedico = ? WHERE idMedico = ?';
        db.query(actualizarMedico, [NombreMedico, ApellidoMedico, FechaNacMedico, TelefonoMedico, DireccionMedico, LocalidadMedico, SalarioMedico, idCatMedico, idMedico], (error, results) => {
            if (error) {
                console.error('Error al modificar el medico:', error);
                res.status(500).json({ error: 'Error al modificar el medico' });
                return;
            }
            res.status(200).json({ message: 'Medico modificado exitosamente' });
        });
    } catch (error) {
        console.error('Error al modificar el medico:', error);
        res.status(500).json({ error: 'Error al modificar el medico' });
    }
};
export const borradoLogicoMedico = async (req, res) => {
    try {
        const { idMedico } = req.params;
        const borrarMedico = 'UPDATE medicos SET isActive = 0 WHERE idMedico = ?';
        db.query(borrarMedico, [idMedico], (error, results) => {
            if (error) {
                console.error('Error al borrar el medico:', error);
                res.status(500).json({ error: 'Error al borrar el medico' });
                return;
            }
            res.status(200).json({ message: 'Medico borrado exitosamente' });
        });
    } catch (error) {
        console.error('Error al borrar el medico:', error);
        res.status(500).json({ error: 'Error al borrar el medico' });
    }
};