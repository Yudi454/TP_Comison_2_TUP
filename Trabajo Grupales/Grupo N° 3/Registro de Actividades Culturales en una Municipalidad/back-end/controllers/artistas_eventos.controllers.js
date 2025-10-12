const connection = require('../config/bd');


// Obtener todos
const obtenerTodos = async (req, res) => {
    try {
        const [result] = await connection.execute('SELECT * FROM artistas_eventos');
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Obtener artistas de un evento
const obtenerPorEvento = async (req, res) => {
    try {
        const { eventoId } = req.params;
        const [result] = await connection.execute(
            'SELECT * FROM artistas_eventos WHERE evento_id = ?',
            [eventoId]
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Crear asignación
const crear = async (req, res) => {
    try {
        const { artista_id, evento_id, rol } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO artistas_eventos (artista_id, evento_id, rol) VALUES (?, ?, ?)',
            [artista_id, evento_id, rol || 'principal']
        );
        res.json({ message: 'Asignación creada'});
    } catch (error) {
        if (error) {
            res.status(400).json({ error: 'Ya existe esta asignación' });
        } else {
            res.status(500).json({ error: 'Error del servidor' });
        }
    }
};

// Eliminar asignación
const eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        await connection.execute('DELETE FROM artistas_eventos WHERE id = ?', [id]);
        res.json({ message: 'Asignación eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorEvento,
    crear,
    eliminar
};