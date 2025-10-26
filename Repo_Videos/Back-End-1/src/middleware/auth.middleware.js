const jwt = require('jsonwebtoken');// importa la biblioteca jsonwebtoken para manejar JWT
const dotenv = require('dotenv');// importa la biblioteca dotenv para manejar variables de entorno

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => { // middleware para verificar el token JWT en las solicitudes entrantes

    const autoheader = req.headers['authorization']; // obtiene el encabezado de autorización de la solicitud

    if(!secretKey){
        return res.status(500).json({message: 'Clave secreta no configurada en el servidor'});
    }

    if(!autoheader){
        return res.status(401).json({message: 'Acceso denegado. No se proporcionó token.'});
    }

    //[encabezado, token]
    const tokenParts = autoheader.split(' '); // divide el encabezado en partes
    if(tokenParts[0] !== 'Bearer' || !tokenParts[1]){
        return res.status(401).json({message: 'Acceso denegado. Formato de token inválido.'});
    }

    const token = tokenParts[1]; // obtiene el token de la segunda parte

    jwt.verify(token, secretKey, (err, decoded) => { // verifica el token usando la clave secreta
        if(err){

          if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({message: 'Acceso denegado. Token inválido o expirado.'});
        }
            return res.status(500).json({message: 'Error al verificar el token.'});
        }   
        req.user = decoded; // almacena la información del usuario decodificada en la solicitud
        next(); // llama al siguiente middleware o ruta
    });
}

module.exports = {verifyToken};// exporta el middleware para usarlo en otras partes de la aplicación