import db from '../config/db.js';

export const obtenerCategoriasMedico = async (req, res) => {
    try {
        const obtenerCategorias = 'SELECT * FROM catMedicos';
        db.query(obtenerCategorias, (error, results) => {
            if (error) {
                console.error('Error al obtener las categorias de medicos:', error);
                res.status(500).json({ error: 'Error al obtener las categorias de medicos' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener las categorias de medicos:', error);
        res.status(500).json({ error: 'Error al obtener las categorias de medicos' });
    }
};

export const obtenerCategoriaMedicoPorId = async (req, res) => {
    try {
        const { idCatMedico } = req.params;
        const obtenerCategoria = 'SELECT * FROM catMedicos WHERE idCatMedico = ?';
        db.query(obtenerCategoria, [idCatMedico], (error, results) => {
            if (error) {
                console.error('Error al obtener la categoria de medico:', error);
                res.status(500).json({ error: 'Error al obtener la categoria de medico' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener la categoria de medico:', error);
        res.status(500).json({ error: 'Error al obtener la categoria de medico' });
    }
};
export const crearCategoriaMedico = async (req, res) => {
    try {
        const { NombreCat} = req.body;
        const nuevaCategoria = 'INSERT INTO catMedicos (NombreCat) VALUES (?)';
        db.query(nuevaCategoria, [NombreCat], (error, results) => {
            if (error) {
                console.error('Error al crear la categoria de medico:', error);
                res.status(500).json({ error: 'Error al crear la categoria de medico' });
                return;
            }
            res.status(201).json({ message: 'Categoria de medico creada exitosamente', idCatMedico: results.insertId });
        });
    } catch (error) {
        console.error('Error al crear la categoria de medico:', error);
        res.status(500).json({ error: 'Error al crear la categoria de medico' });
    }
};
export const modificarCategoriaMedico = async (req, res) => {
    try {
        const { idCatMedico } = req.params;
        const { NombreCat } = req.body;
        const actualizarCategoria = 'UPDATE catMedicos SET NombreCat = ? WHERE idCatMedico = ?';
        db.query(actualizarCategoria, [NombreCat, idCatMedico], (error, results) => {
            if (error) {
                console.error('Error al modificar la categoria de medico:', error);
                res.status(500).json({ error: 'Error al modificar la categoria de medico' });
                return;
            }
            res.status(200).json({ message: 'Categoria de medico modificada exitosamente' });
        });
    } catch (error) {
        console.error('Error al modificar la categoria de medico:', error);
        res.status(500).json({ error: 'Error al modificar la categoria de medico' });
    }
};
export const borradoLogicoCategoriaMedico = async (req, res) => {
    try {
        const { idCatMedico } = req.params;
        const borrarCategoria = 'UPDATE catMedicos SET isActive = 0 WHERE idCatMedico = ?';
        db.query(borrarCategoria, [idCatMedico], (error, results) => {
            if (error) {
                console.error('Error al borrar la categoria de medico:', error);
                res.status(500).json({ error: 'Error al borrar la categoria de medico' });
                return;
            }
            res.status(200).json({ message: 'Categoria de medico borrada exitosamente' });
        });
    } catch (error) {
        console.error('Error al borrar la categoria de medico:', error);
        res.status(500).json({ error: 'Error al borrar la categoria de medico' });
    }
};