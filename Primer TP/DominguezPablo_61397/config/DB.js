const mysql = require("mysql2") //Importo Libreria Sql


const conection = mysql.createConnection({ //Guardo En Variable Datos Para Ingresar a La BD
    host: "localhost",
    user: "TP1",
    password: "Tp1programacion",
    database: "TP1"
    
})


module.exports = { conection } //Exporto Mi Conexion a La Base De Datos