const mysqlLib = require('../lib/mysql');
const mesesEspanol = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const clienteServicios = {
  obtenerTodos: async function() {
    const clientes = await mysqlLib.select(
      [
        'c.id',
        'c.nombre',
      ],
      [
        'clientes c',
      ]
    )
    .then(resultado => resultado)
    .catch(err => console.log(err));

    return clientes;
  },
  obtenerTodosConPagos: async function() {
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

    clienteRetorno = {};
    clientes.forEach(cliente => {
      if (!clienteRetorno[cliente.id]) {
        const fechaUltimoPago = new Date(cliente.ultimoPago);
        clienteRetorno[cliente.id] = {
          nombre: cliente.nombre,
          telefono: cliente.telefono,
          ultimoPago: (
            fechaUltimoPago.getFullYear() +
            '-' +
            (fechaUltimoPago.getMonth() + 1) +
            '-' +
            fechaUltimoPago.getDate() +
            ' ' +
            (
              fechaUltimoPago.getHours() < 10 ?
              ('0' + fechaUltimoPago.getHours()) :
              fechaUltimoPago.getHours()
            ) +
            ':' +
            (
              fechaUltimoPago.getMinutes() < 10 ?
              ('0' + fechaUltimoPago.getMinutes()) :
              fechaUltimoPago.getMinutes()
            ) +
            ':' +
            (
              fechaUltimoPago.getSeconds() < 10 ?
              ('0' + fechaUltimoPago.getSeconds()) :
              fechaUltimoPago.getSeconds()
            )
          ),
          pagos: {},
        };
      }

      if (!cliente.pagoId) {
        return;
      }

      const pagoFechaCreacion = new Date(cliente.pagoFechaCreacion);
      let pagoFechaCreacionHora = (
        (pagoFechaCreacion.getHours() < 10) ?
        ('0' + pagoFechaCreacion.getHours()) :
        pagoFechaCreacion.getHours()
      );
      let pagoFechaCreacionHoraRango = 'AM';
      if (pagoFechaCreacion.getHours() > 12) {
        pagoFechaCreacionHora = (
          ((pagoFechaCreacion.getHours() - 12) < 10) ?
          ('0' + (pagoFechaCreacion.getHours() - 12)) :
          (pagoFechaCreacion.getHours() - 12)
        );
        pagoFechaCreacionHoraRango = 'PM';
      }
      clienteRetorno[cliente.id]['pagos'][cliente.pagoId] = {
        monto: cliente.pagoMonto,
        prueba: pagoFechaCreacion,
        prueba2: cliente.pagoFechaCreacion,
        fechaCreacion: (
          pagoFechaCreacion.getDate() +
          ' ' +
          mesesEspanol[pagoFechaCreacion.getMonth()] +
          ' ' +
          pagoFechaCreacion.getFullYear() +
          ' ' +
          pagoFechaCreacionHora +
          ':' +
          (
            pagoFechaCreacion.getMinutes() < 10 ?
            ('0' + pagoFechaCreacion.getMinutes()) :
            pagoFechaCreacion.getMinutes()
          ) +
          ':' +
          (
            pagoFechaCreacion.getSeconds() < 10 ?
            ('0' + pagoFechaCreacion.getSeconds()) :
            pagoFechaCreacion.getSeconds()
          ) +
          ' ' +
          pagoFechaCreacionHoraRango
        ),
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
          ultimo_pago: null
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
