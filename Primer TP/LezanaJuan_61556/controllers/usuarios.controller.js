// Arreglo que simula la base de datos
const usuarios = [];

// Función GET: devuelve todos los usuarios
const getUsuarios = (req, res) => {
    res.json(usuarios);
};

// Función POST: crea un nuevo usuario
const createUsuario = (req, res) => {
    const { nombre, email } = req.body;

    // Validación simple
    if (!nombre || !email) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        email
    };

    // Guardar en "base de datos"
    usuarios.push(nuevoUsuario);

    // Devolver usuario creado
    res.status(201).json(nuevoUsuario);
};

// Exportamos funciones
module.exports = {
    getUsuarios,
    createUsuario
};








