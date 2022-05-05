const express = require('express');
const pagoServicio = require('../servicios/pago');
const clienteServicio = require('../servicios/cliente');

function pagoRutas(app) {
  const router = express.Router();
  app.use('/pago', router);

  router.post('/agregar', async (req, res, next) => {
    await pagoServicio.agregar(req.body.clienteId, req.body.monto);
    res.status(200).json();
  });
}

module.exports = pagoRutas;
