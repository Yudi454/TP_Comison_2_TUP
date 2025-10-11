import { db } from "./config/DB.js";

console.log("🔍 Verificando conexión con MySQL...");

db.query("SELECT 1 + 1 AS resultado", (err, result) => {
  if (err) {
    console.error("❌ Error de conexión o consulta:", err.message);
  } else {
    console.log("✅ Conexión exitosa. Resultado de prueba:", result[0].resultado);
  }
  db.end(); // Cerramos la conexión
});