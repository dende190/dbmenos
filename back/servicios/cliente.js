const mysqlLib = require('../lib/mysql');

const clienteServicios = {
  obtenerTodos: async function() {
    const clientes = await mysqlLib.select(
      [
        'c.id',
        'c.nombre',
        'c.telefono',
        'c.ultimo_pago ultimoPago',
        'p.id pagoId',
        'p.monto pagoMonto',
        'p.fecha_creacion pagoFechaCreacion',
      ],
      [
        'clientes c',
        'LEFT JOIN pagos p ON p.cliente = c.id',
      ]
    )
    .then(resultado => resultado)
    .catch(err => console.log(err));

    clienteRetorno = [];
    clientes.forEach(cliente => {
      if (!clienteRetorno[cliente.id]) {
        clienteRetorno[cliente.id] = {
          nombre: cliente.nombre,
          telefono: cliente.telefono,
          ultimoPago: cliente.ultimoPago,
          pagos: {},
        };
      }

      clienteRetorno[cliente.id]['pagos'][cliente.pagoId] = {
        monto: cliente.pagoMonto,
        fechaCreacion: cliente.pagoFechaCreacion,
      };
    });

    return clienteRetorno;
  },
  agregar: async function(nombre, telefono) {
    if (!nombre || !telefono) {
      return 0;
    }

    const clienteId = await (
      mysqlLib
      .insert(
        {
          nombre,
          telefono,
        },
        'clientes'
      )
      .then(clienteId => clienteId)
      .catch(err => console.log(err))
    );

    return (clienteId || 0);
  },
  guardarFechaUltimoPago: async function(clienteId, fechaUltimoPago) {
    if (!clienteId || !fechaUltimoPago) {
      return;
    }

    await mysqlLib.update(
      {ultimo_pago: fechaUltimoPago},
      [
        ['id', clienteId],
      ],
      'clientes'
    );
  }
};

module.exports = clienteServicios;
