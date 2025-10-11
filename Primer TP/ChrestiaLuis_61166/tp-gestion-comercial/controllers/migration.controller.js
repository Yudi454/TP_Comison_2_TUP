import poolCreation from "../config/db-creation.js";
import pool from "../config/db.js";

export const migrateTables = async (req, res) => {
  try {

    await poolCreation.query(`
      DROP DATABASE IF EXISTS programacion_iv;
      CREATE DATABASE programacion_iv;
      USE programacion_iv;

      CREATE TABLE IF NOT EXISTS vendedores (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        user VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS proveedores (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(50) NOT NULL UNIQUE,
        telefono VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS productos (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(50) NOT NULL UNIQUE,
        precio INT NOT NULL,
        stock INT NOT NULL,
        proveedor_id INT,
        FOREIGN KEY (proveedor_id) REFERENCES proveedores(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS ventas (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        fecha DATE NOT NULL,
        vendedor_id INT,
        producto_id INT,
        cantidad INT NOT NULL DEFAULT 1,
        FOREIGN KEY (vendedor_id) REFERENCES vendedores(id) ON DELETE SET NULL,
        FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE SET NULL
      );
    `)
    return res.json({status: 200, message: 'Tablas migradas con exito'})
  } catch (error) {
    console.log(error)
    return res.json({status: 400, message: 'Error al migrar las tablas'})
  }
}

export const populateTables = async (req, res) => {
  try {
    await pool.query(`
      INSERT INTO vendedores (user, password) VALUES
      ('vendedor1', 'password1'),
      ('vendedor2', 'password2'),
      ('vendedor3', 'password3'),
      ('vendedor4', 'password4'),
      ('vendedor5', 'password5');
      
      INSERT INTO proveedores (nombre, telefono, email) VALUES
      ('proveedor1', 'telefono1', 'email1'),
      ('proveedor2', 'telefono2', 'email2'),
      ('proveedor3', 'telefono3', 'email3'),
      ('proveedor4', 'telefono4', 'email4'),
      ('proveedor5', 'telefono5', 'email5');

      INSERT INTO productos (nombre, precio, stock, proveedor_id) VALUES
      ('producto1', 100, 10, 1),
      ('producto2', 200, 20, 2),
      ('producto3', 300, 30, 3),
      ('producto4', 400, 40, 4),
      ('producto5', 500, 50, 5);

      INSERT INTO ventas (fecha, vendedor_id, producto_id) VALUES
      ('2023-01-01', 1, 1),
      ('2023-01-02', 2, 2),
      ('2023-01-03', 3, 3),
      ('2023-01-04', 4, 4),
      ('2023-01-05', 5, 5);
    `)
    return res.json({status: 200, message: 'Tablas pobladas con exito'})
  } catch (error) {
    console.log(error)
    return res.json({status: 400, message: 'Error al poblar las tablas'})
  }
}