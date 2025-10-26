CREATE TABLE `artistas` (
   `id` int NOT NULL AUTO_INCREMENT,
   `nombre` varchar(100) DEFAULT NULL,
   `genero` varchar(50) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


 CREATE TABLE `eventos` (
   `id` int NOT NULL AUTO_INCREMENT,
   `nombre` varchar(100) DEFAULT NULL,
   `fecha` date DEFAULT NULL,
   `lugar` varchar(100) DEFAULT NULL,
   `cupo_maximo` int DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

 CREATE TABLE `asistentes` (
   `id` int NOT NULL AUTO_INCREMENT,
   `nombre` varchar(100) DEFAULT NULL,
   `email` varchar(100) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

 CREATE TABLE `inscripciones` (
   `id` int NOT NULL AUTO_INCREMENT,
   `id_evento` int NOT NULL,
   `nombre` varchar(100) NOT NULL,
   `apellido` varchar(100) NOT NULL,
   `fecha_inscripcion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   KEY `inscripciones_ibfk_evento` (`id_evento`),
   CONSTRAINT `inscripciones_ibfk_evento` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE
 ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

 CREATE TABLE `evento_artista` (
   `id` int NOT NULL AUTO_INCREMENT,
   `id_evento` int NOT NULL,
   `id_artista` int NOT NULL,
   PRIMARY KEY (`id`),
   KEY `fk_evento_artista_evento` (`id_evento`),
   KEY `fk_evento_artista_artista` (`id_artista`),
   CONSTRAINT `fk_evento_artista_artista` FOREIGN KEY (`id_artista`) REFERENCES `artistas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT `fk_evento_artista_evento` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci