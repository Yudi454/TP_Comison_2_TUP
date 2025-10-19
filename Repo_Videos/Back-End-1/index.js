//index global del proyecto levanta el servidor 

const dotenv = require("dotenv");
const app = require("./src/app");
dotenv.config();// traigo las variables de entorno desde el archivo .env


const PORT = process.env.SERVER_PORT || 3000;



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});