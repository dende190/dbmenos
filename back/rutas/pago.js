const express = require('express');
const pagoServicio = require('../servicios/pago');
const clienteServicio = require('../servicios/cliente');

function pagoRutas(app) {
  const router = express.Router();
  app.use('/pago', router);

  router.post('/agregar', async (req, res, next) => {
    const clienteId = req.body.clienteId;
    const pagoId = await pagoServicio.agregar(clienteId, req.body.monto);
    if (!pagoId) {
      res.status(301).json({});
      return;
    }

    const fechaUltimoPago = await pagoServicio.obtenerFechaUltimoPago(pagoId);
    await clienteServicio.guardarFechaUltimoPago(clienteId, fechaUltimoPago);
    res.status(200).json(pagoDatos);
  });
}

module.exports = pagoRutas;
