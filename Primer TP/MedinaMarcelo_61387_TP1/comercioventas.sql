create database comercioventas ;

use comercioventas;

create table usuario (
id_usuario int auto_increment primary key  ,
nombre varchar (100) not null ,
apellido varchar (100) not null ,
dni int not null unique,
email varchar (150)not null unique,
telefono varchar (10) not null,
rol enum ('admin', 'usuario') default 'usuario' ,
activo boolean default true,
fecha_alta datetime default current_timestamp
);

create table proveedores (
id_proveedor int auto_increment primary key ,
nombre  varchar (100) not null ,
domicilio varchar (150) not null,
telefono varchar (10) not null,
email varchar (150) not null unique
);

create table productos (
id_producto int auto_increment primary key ,
nombre varchar (100) not null ,
descripcion text not null,
precio decimal (10,2) not null,
costo DECIMAL(10,2) NOT NULL,
fecha_de_creacion datetime default current_timestamp ,
id_proveedor int ,
foreign key (id_proveedor)references proveedores (id_proveedor)
);

create table stock (
id_stock int auto_increment primary key ,
id_producto int not null ,
cantidad int default 0 not null ,
fecha_de_ultima_actulizacion datetime default current_timestamp,
foreign key (id_producto) references productos (id_producto)
);

create table ventas (
id_venta int auto_increment primary key ,
fecha_de_venta datetime default current_timestamp ,
total_venta decimal (10,2) not null ,
metodo_pago ENUM('efectivo','transferencia','debito','credito') DEFAULT 'efectivo',
id_usuario int not null ,
foreign key (id_usuario)references usuario (id_usuario)
);

create table metricas_venta (
id_detalle_venta int auto_increment primary key ,
id_venta int not null ,
id_producto int not null ,
cantidad int not null ,
precio_unitario decimal (10,2)not null,
foreign key (id_venta) references ventas (id_venta),
foreign key (id_producto)references productos (id_producto)
);
