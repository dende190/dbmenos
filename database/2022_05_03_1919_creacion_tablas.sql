CREATE DATABASE dbmenos;
USE dbmenos;

CREATE TABLE clientes(
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `telefono` INT(10) NOT NULL,
  `ultimo_pago` DATETIME NOT NULL, /*Lo llamaria: fecha_ultimo_pago*/
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

CREATE TABLE pagos(
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cliente` FLOAT(11) UNSIGNED NOT NULL, /*Lo llamaria: cliente_id*/
  `monto` INT(11) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  FOREIGN KEY(cliente) REFERENCES clientes(id)
);

INSERT INTO clientes(nombre, telefono, ultimo_pago, fecha_creacion) VALUES
('Juan Perez', '12345', '2020-10-15', '2020-09-01 11:00:00'),
('john Smith', '564321', '2022-10-15', '2020-08-15 11:00:00');

INSERT INTO pagos(cliente, monto, fecha_creacion) VALUES
(1, 200, '2021-09-01 11:00:00'),
(2, 300, '2021-08-15 11:10:00'),
(1, 110, '2021-10-16 11:20:00'),
(2, 87.50, '2021-09-17 19:30:00'),
