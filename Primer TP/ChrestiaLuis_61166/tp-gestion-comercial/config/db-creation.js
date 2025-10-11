import mysql2 from 'mysql2/promise'

const poolCreation = mysql2.createPool({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});

export default poolCreation;
