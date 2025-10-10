import poolMigration from '../config/connectionMigration.js';
import pool from '../config/db.js';

export const createDatabase = async (req, res) => {
  try{
    const dbName = process.env.MYSQL_DATABASE;
    await poolMigration.query(`DROP DATABASE IF EXISTS ${dbName}`)
    await poolMigration.query(`CREATE DATABASE ${dbName}`)
    res.json({status: 200, payload: 'Database creada'})
  }
  catch(error){
    console.log(error)
  }
}

export const createTables = async (req, res) => {
  try {
    const dbName = process.env.MYSQL_DATABASE;
    await poolMigration.query(`USE ${dbName};`);
    await poolMigration.query(`
      CREATE TABLE donadores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        contacto VARCHAR(100) NOT NULL,
        deleted_at TIMESTAMP NULL DEFAULT NULL
      );`);
    res.json({status: 200, payload: 'Tablas creadas'});
  } catch (error) {
    console.log(error);
    res.status(400).json({status: 400, payload: 'Error al crear las tablas'});
  }
}

export const createData = async (req, res) => {
  try {

    await pool.query(`
      INSERT INTO donadores (nombre, apellido, contacto) VALUES
        ('Juan', 'Pérez', '3815123456'),
        ('María', 'Gómez', '1123456789'),
        ('Carlos', 'López', '3815234678'),
        ('Ana', 'Martínez', '1167892345'),
        ('Pedro', 'González', '3815345678'),
        ('Laura', 'Sánchez', '1134567890'),
        ('Javier', 'Rodríguez', '3815456789'),
        ('Sofía', 'Fernández', '1145678901'),
        ('Miguel', 'Díaz', '3815567890'),
        ('Elena', 'Torres', '1156789012');
      `);
    
    res.json({status: 200, payload: 'Datos insertados'});
  } catch (error) {
    console.log(error);
    res.status(400).json({status: 400, payload: error.sqlMessage || 'Error al insertar los datos'});
  }
}