import mysql2 from 'mysql2/promise';

const pool = mysql2.createPool({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
    
});

export default pool;