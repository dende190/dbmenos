const express = require('express');
const pagoServicio = require('../servicios/pago');
const clienteServicio = require('../servicios/cliente');

function pagoRutas(app) {
  const router = express.Router();
  app.use('/pago', router);

  router.post('/agregar', async (req, res, next) => {
    const clienteId = req.body.clienteId;
    const pagoId = await pagoServicio.agregar(clienteId, req.body.monto);
    res.status(200).json(pagoDatos);
  });
}

module.exports = pagoRutas;
