-- ==========================================
-- TABLA DE USUARIOS
-- ==========================================
CREATE TABLE Usuarios (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  rol ENUM('Admin','Empleado') DEFAULT 'Empleado',
  activo BOOLEAN DEFAULT TRUE
);

-- ==========================================
-- TABLA DE CLIENTES
-- ==========================================
CREATE TABLE Clientes (
  id_cliente INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(60) NOT NULL,
  DNI VARCHAR(20) UNIQUE,
  activo BOOLEAN DEFAULT TRUE
);

-- ==========================================
-- TABLA DE PRODUCTOS
-- ==========================================
CREATE TABLE Productos (
  id_producto INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  activo BOOLEAN DEFAULT TRUE
);

-- ==========================================
-- TABLA DE VENTAS
-- ==========================================
CREATE TABLE Ventas (
  id_venta INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_cliente INT NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) DEFAULT 0,
  activo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
  FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- ==========================================
-- TABLA DE DETALLES DE VENTA
-- ==========================================
CREATE TABLE Ventas_Detalles (
  id_detalle INT PRIMARY KEY AUTO_INCREMENT,
  id_venta INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  FOREIGN KEY (id_venta) REFERENCES Ventas(id_venta),
  FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);
