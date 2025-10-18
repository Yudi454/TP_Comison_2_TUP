import db from '../config/db.js';

export const obtenerObservaciones = async (req, res) => {
    try {
        const obtenerListadoObservaciones = 'SELECT * FROM observaciones';
        db.query(obtenerListadoObservaciones, (error, results) => {
            if (error) {
                console.error('Error al obtener las observaciones:', error);
                res.status(500).json({ error: 'Error al obtener las observaciones' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener las observaciones:', error);
        res.status(500).json({ error: 'Error al obtener las observaciones' });
    }
};

export const obtenerObservacionPorId = async (req, res) => {
    try {
        const { idObservacion } = req.params;
        const obtenerObservacion = 'SELECT * FROM observaciones WHERE idObservacion = ?';
        db.query(obtenerObservacion, [idObservacion], (error, results) => {
            if (error) {
                console.error('Error al obtener la observacion:', error);
                res.status(500).json({ error: 'Error al obtener la observacion' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener la observacion:', error);
        res.status(500).json({ error: 'Error al obtener la observacion' });
    }
};

export const crearObservacion = async (req, res) => {
    try {
        const { idTurno, Comentario } = req.body;
        const nuevaObservacion = 'INSERT INTO observaciones (idTurno, Comentario) VALUES (?, ?)';
        db.query(nuevaObservacion, [idTurno, Comentario], (error, results) => {
            if (error) {
                console.error('Error al crear la observacion:', error);
                res.status(500).json({ error: 'Error al crear la observacion' });
                return;
            }
            res.status(201).json({ message: 'Observacion creada exitosamente', idObservacion: results.insertId });
        });
    } catch (error) {
        console.error('Error al crear la observacion:', error);
        res.status(500).json({ error: 'Error al crear la observacion' });
    }
};

export const modificarObservacion = async (req, res) => {
    try {
        const { idObservacion } = req.params;
        const { idTurno, Comentario } = req.body;
        const actualizarObservacion = 'UPDATE observaciones SET idTurno = ?, Comentario = ? WHERE idObservacion = ?';
        db.query(actualizarObservacion, [idTurno, Comentario, idObservacion], (error, results) => {
            if (error) {
                console.error('Error al modificar la observacion:', error);
                res.status(500).json({ error: 'Error al modificar la observacion' });
                return;
            }
            res.status(200).json({ message: 'Observacion modificada exitosamente' });
        });
    } catch (error) {
        console.error('Error al modificar la observacion:', error);
        res.status(500).json({ error: 'Error al modificar la observacion' });
    }
};

export const borradoLogicoObservacion = async (req, res) => {
    try {
        const { idObservacion } = req.params;
        const borrarObservacion = 'UPDATE observaciones SET isActive = 0 WHERE idObservacion = ?';
        db.query(borrarObservacion, [idObservacion], (error, results) => {
            if (error) {
                console.error('Error al borrar la observacion:', error);
                res.status(500).json({ error: 'Error al borrar la observacion' });
                return;
            }
            res.status(200).json({ message: 'Observacion borrada exitosamente' });
        });
    } catch (error) {
        console.error('Error al borrar la observacion:', error);
        res.status(500).json({ error: 'Error al borrar la observacion' });
    }
};