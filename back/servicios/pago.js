const mysqlLib = require('../lib/mysql');

const pagoServicios = {
  agregar: async function(clienteId, monto) {
    if (!clienteId || !monto) {
      return 0;
    }

    const pagoId = await (
      mysqlLib
      .insert(
        {
          cliente: clienteId,
          monto,
        },
        'pagos'
      )
      .then(pagoId => pagoId)
      .catch(err => console.log(err))
    );

    return (pagoId || 0);
  },
  obtenerFechaUltimoPago: async function(clienteId) {
    if (!clienteId) {
      return '';
    }

    const fechaCreacion = await mysqlLib.selectRow(
      [
        'p.fecha_creacion fechaCreacion',
      ],
      [
        'pagos',
      ],
      [
        ['cliente', clienteId],
      ],
      [
        'ORDER BY fecha_creacion DESC',
      ]
    )
    .then(resultado => resultado)
    .catch(err => console.log(err));

    return fechaCreacion.fechaCreacion;
  }
};

module.exports = pagoServicios;
