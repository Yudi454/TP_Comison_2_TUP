const mysql2 = require("mysql2")

const conection = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password: 'axelsamuel10',
    database:'gimnasio'
})
conection.connect((err) => {
    if (err) {
        console.error("❌ Error al conectar con la base de datos:", err);
    } else {
        console.log("✅ Conectado a la base de datos MySQL");
    }
});
module.exports= conection