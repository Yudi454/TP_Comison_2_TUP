DROP DATABASE IF EXISTS gestion_comercial;
CREATE DATABASE gestion_comercial;
USE gestion_comercial;

CREATE USER IF NOT EXISTS 'tp_user'@'localhost' IDENTIFIED BY '12345';
GRANT ALL PRIVILEGES ON gestion_comercial.* TO 'tp_user'@'localhost';
FLUSH PRIVILEGES;

-- Tabla de usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  rol VARCHAR(50) DEFAULT 'empleado',  -- Cambiado de ENUM a VARCHAR
  fecha_alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM usuarios;

-- Tabla de proveedores
CREATE TABLE proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(50),
  email VARCHAR(100),
  direccion VARCHAR(150),
  fecha_alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM proveedores;

-- Tabla de productos
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  id_proveedor INT,
  FOREIGN KEY (id_proveedor) REFERENCES proveedores(id) ON DELETE SET NULL
);

-- Tabla de ventas
CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Tabla detalle de ventas
CREATE TABLE detalle_ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_venta INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  FOREIGN KEY (id_venta) REFERENCES ventas(id) ON DELETE CASCADE,
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- Datos iniciales
INSERT INTO usuarios (nombre, email, rol) VALUES
('Guillermo Carrero', 'guillermo@empresa.com', 'admin'),
('María López', 'maria@empresa.com', 'empleado');

INSERT INTO proveedores (nombre, telefono, email, direccion) VALUES
('Proveedor A', '1122334455', 'contacto@proveedora.com', 'Av. Mitre 123'),
('Proveedor B', '1199887766', 'ventas@proveedorb.com', 'Calle Rivadavia 456');

INSERT INTO productos (nombre, descripcion, precio, stock, id_proveedor) VALUES
('Monitor 24"', 'Monitor LED Full HD', 75000.00, 15, 1),
('Teclado Mecánico', 'Teclado RGB retroiluminado', 25000.00, 30, 2),
('Mouse Inalámbrico', 'Mouse ergonómico inalámbrico', 18000.00, 25, 1);

INSERT INTO ventas (id_usuario, total) VALUES (1, 93000.00);

INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario)
VALUES (1, 1, 1, 75000.00),
       (1, 3, 1, 18000.00);

       
-- Total de usuarios
SELECT COUNT(*) AS total_usuarios FROM usuarios;

-- Total de productos y stock general
SELECT COUNT(*) AS total_productos, SUM(stock) AS stock_total FROM productos;

-- Total de ventas y monto total vendido
SELECT COUNT(*) AS total_ventas, SUM(total) AS monto_total FROM ventas;

-- Productos más vendidos (TOP 5)
SELECT p.nombre, SUM(dv.cantidad) AS total_vendidos
FROM detalle_ventas dv
JOIN productos p ON dv.id_producto = p.id
GROUP BY p.id
ORDER BY total_vendidos DESC
LIMIT 5;