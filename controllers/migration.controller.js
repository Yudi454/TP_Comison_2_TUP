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
      );

      CREATE TABLE IF NOT EXISTS productos(
        id_producto INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion VARCHAR(255),
        categoria VARCHAR(100),
        cantidad INT
      );
      
      `);
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

        
      INSERT INTO productos (nombre, descripcion, categoria, cantidad) VALUES
        ('Arroz', 'Arroz blanco de alta calidad', 'Alimento perecedero', 100),
        ('Leche', 'Leche entera', 'Alimento perecedero', 50),
        ('Pollo', 'Pollo fresco', 'Alimento perecedero', 30),
        ('Pescado', 'Pescado fresco', 'Alimento perecedero', 20),
        ('Huevos', 'Huevos de gallina', 'Alimento perecedero', 40),
        ('Cereal', 'Cereal de trigo', 'Alimento perecedero', 60),
        ('Aceite', 'Aceite de oliva', 'Alimento perecedero', 25),
        ('Yogur', 'Yogur natural', 'Alimento perecedero', 35),
        ('Frutas', 'Frutas frescas', 'Alimento perecedero', 70),
        ('Verduras', 'Verduras frescas', 'Alimento perecedero', 45),
        ('Azúcar', 'Azúcar refinada', 'Alimento no perecedero', 80),
        ('Arvejas en lata', 'Arvejas en conserva', 'Alimento no perecedero', 50),
        ('Pan', 'Pan fresco de trigo', 'Alimento perecedero', 30),
        ('Sal', 'Sal fina de mesa', 'Alimento no perecedero', 90),
        ('Galletitas', 'Galletitas dulces surtidas', 'Alimento no perecedero', 60),
        ('Manteca', 'Manteca natural', 'Alimento perecedero', 25),
        ('Harina', 'Harina de trigo 000', 'Alimento no perecedero', 100),
        ('Queso', 'Queso cremoso', 'Alimento perecedero', 40),
        ('Café', 'Café molido', 'Alimento no perecedero', 70),
        ('Arroz integral', 'Arroz integral de grano largo', 'Alimento no perecedero', 55);
      `);
    
    res.json({status: 200, payload: 'Datos insertados'});
  } catch (error) {
    console.log(error);
    res.status(400).json({status: 400, payload: error.sqlMessage || 'Error al insertar los datos'});
  }
}