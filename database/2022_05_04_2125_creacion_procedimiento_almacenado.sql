DELIMITER $$
CREATE PROCEDURE crearPago(IN clienteId INT(11), IN monto FLOAT(11,2), IN fechaCreacion DATETIME)
BEGIN
  INSERT INTO pagos(cliente, monto, fecha_creacion) VALUES (clienteId, monto, fechaCreacion);
  UPDATE clientes SET ultimo_pago = fechaCreacion WHERE id = clienteId;
END$$
DELIMITER
