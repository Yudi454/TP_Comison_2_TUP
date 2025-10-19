const bcrypt = require('bcrypt');// importa la biblioteca bcrypt para el hash de contraseñas

const hashPassword = async (password) => { // función asíncrona para hashear una contraseña
    return await bcrypt.hash(password, 10); // retorna la contraseña hasheada con un salt de 10 rondas
}

const comparePassword = async (password, hashedPassword) => { // función asíncrona para comparar una contraseña con su hash
    return await bcrypt.compare(password, hashedPassword); // retorna true si coinciden, false si no
}

module.exports = { hashPassword, comparePassword }; // exporta las funciones para usarlas en otras partes de la aplicación