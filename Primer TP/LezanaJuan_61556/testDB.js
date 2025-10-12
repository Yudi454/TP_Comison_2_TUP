const pool = require('./config/DB');

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
  } else {
    console.log('Conexión a MySQL exitosa');
    connection.release();
  }
});
