const express = require('express');
const clienteServicio = require('../servicios/cliente');

function clienteRutas(app) {
  const router = express.Router();
  app.use('/cliente', router);

  router.post('/obtener', async (req, res, next) => {
    const clientes = await clienteServicio.obtenerTodos();
    res.status(200).json(clientes);
  });

  router.post('/agregar', async (req, res, next) => {
    const clienteDatos = await (
      clienteServicio
      .agregar(req.body.nombre, req.body.telefono)
    );
    res.status(200).json(clienteDatos);
  });
}

module.exports = clienteRutas;
