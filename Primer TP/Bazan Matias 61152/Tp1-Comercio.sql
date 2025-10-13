create database comercio_tp1_prog4;
use comercio_tp1_prog4;


create table usuarios(
idUsuario int not null  primary key auto_increment,
nombreUsuario varchar(50) not null,
apellidoUsuario varchar(50) not null,
direccionUsuario varchar(100) not null,
telefonoUsuario varchar(10) not null,
emailUsuario varchar(50) not null unique,
contraseñaUsuario varchar(10) not null,
IsActive tinyint default 1
);
create table proveedores(
idProveedor int not null  primary key auto_increment,
nombreProveedor varchar (50),
direccionProveedor varchar(50),
telefonoProveedor varchar(50),
IsActive tinyint default 1
);
create table productos(
idProducto int not null  primary key auto_increment,
nombreProducto varchar(50),
codigoProducto int unique not null,
precioCompraProducto decimal (10,2) ,
precioVentaProducto decimal (10,2), 
stockProdcuto varchar(50),
descripcionProducto text,
IsActive tinyint default 1
);
create table ventas(
idVenta int not null  primary key auto_increment,
fechaVenta datetime,
montoVenta decimal(10,2)
);
create table metricas(
idMetrica int not null  primary key auto_increment,

);