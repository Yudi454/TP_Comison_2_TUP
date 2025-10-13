const db = require('../config/bd');

const getAllArtistas = async (req, res) => {
    try {
        const [artistas] = await db.query('SELECT * FROM artistas');
        res.json(artistas);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los artistas', error: error.message});
    }   
};

const getArtistasById = async (req, res) => {
    try {
        const [artista] = await db.query('SELECT * FROM artistas WHERE id = ?', [req.params.id]);
        if (artista.length === 0) {
            return res.status(404).json({message: 'Artista no encontrado'});
        }
        res.json(artista[0]);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el artista', error: error.message});
    }
};

const createArtista = async (req, res) => {
    try {
        const { nombre, tipo_arte, biografia, email, telefono } = req.body;
        const [result] = await db.query(
            'INSERT INTO artistas (nombre, tipo_arte, biografia, email, telefono) VALUES (?, ?, ?, ?, ?)',
            [nombre, tipo_arte, biografia, email, telefono]
        );
        res.status(201).json({id: result.insertId, message: 'Artista Creado Correctamente'});
    } catch (error) {
        res.status(500).json({message: 'Error al crear artista', error: error.message});
    }
};

const updateArtista = async (req, res) => {
    try {
        const { nombre, tipo_arte, biografia, email, telefono, activo } = req.body;
        await db.query(
            'UPDATE artistas SET nombre=?, tipo_arte=?, biografia=?, email=?, telefono=?, activo=? WHERE id=?',
            [nombre, tipo_arte, biografia, email, telefono, activo, req.params.id]
        );
        res.json({message: 'Artista Actualizado Correctamente'});
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar el artista', error: error.message});
    }
};

const deleteArtista = async (req, res) => {
    try {
        await db.query('DELETE FROM artistas WHERE id = ?', [req.params.id]);  
        res.json({message: 'Artista eliminado'});        
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar artista', error: error.message});
    }
};


module.exports = { getAllArtistas, getArtistasById, createArtista, updateArtista, deleteArtista };