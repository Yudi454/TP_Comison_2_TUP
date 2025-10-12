
CREATE DATABASE IF NOT EXISTS club_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE club_db;

-- Socios
CREATE TABLE IF NOT EXISTS socios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  telefono VARCHAR(50),
  email VARCHAR(150),
  fecha_alta DATE DEFAULT CURRENT_DATE,
  activo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Deportes
CREATE TABLE IF NOT EXISTS deportes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Membresias: socio inscrito a un deporte; cuota mensual puede variar por deporte o por socio
CREATE TABLE IF NOT EXISTS membresias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  socio_id INT NOT NULL,
  deporte_id INT NOT NULL,
  cuota_mensual DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  fecha_alta DATE DEFAULT CURRENT_DATE,
  activo TINYINT(1) DEFAULT 1,
  UNIQUE (socio_id, deporte_id),
  FOREIGN KEY (socio_id) REFERENCES socios(id) ON DELETE CASCADE,
  FOREIGN KEY (deporte_id) REFERENCES deportes(id) ON DELETE CASCADE
);

-- Pagos: registro por mes/año (cada pago asocia a una membresía y a un periodo)
CREATE TABLE IF NOT EXISTS pagos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membresia_id INT NOT NULL,
  importe DECIMAL(10,2) NOT NULL,
  fecha_pago DATE NOT NULL DEFAULT CURRENT_DATE,
  cuota_mes TINYINT NOT NULL,   
  cuota_anio SMALLINT NOT NULL, 
  metodo_pago VARCHAR(50),
  comentario VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (membresia_id) REFERENCES membresias(id) ON DELETE CASCADE
);

-- Índices útiles
CREATE INDEX idx_pagos_periodo ON pagos(cuota_anio, cuota_mes);
CREATE INDEX idx_membresias_socio ON membresias(socio_id);
