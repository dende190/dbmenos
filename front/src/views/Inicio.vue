<template>
  <section class="inicio">
    <div v-if="clientes" class="clientes">
      <h1>Listado de clientes:</h1>
      <p>Aqui vas a poder ver el listado de clientes que tienes y los ultimos pagos que realizaron</p>
      <table
        v-for="(cliente, clienteId) in clientes"
        :key="clienteId"
        class="clientes-tabla"
      >
        <thead>
          <tr>
            <th>ID: {{ clienteId }}</th>
            <!-- Telefono le agregaria dos puntos -->
            <!-- ultimo pago lo escribiria con la U en mayuscula -->
            <th colspan="2">
              Nombre: {{ cliente.nombre }},
              Teléfono {{ cliente.telefono }},
              último pago: {{ cliente.ultimoPago }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Monto</td>
            <td>Fecha y hora</td>
          </tr>
          <tr v-for="(pagos, pagoId) in cliente.pagos" :key="pagoId">
            <td>{{ pagoId }}</td>
            <td>{{ pagos.monto }}</td>
            <td>{{ pagos.fechaCreacion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script>
  const apiEnlace = 'http://localhost:8081/cliente/obtenerTodosConPagos';
  export default {
    name: 'App',
    data() {
      return {
        clientes: {},
      };
    },
    created() {
      this.obtenerClientes();
    },
    methods: {
      async obtenerClientes() {
        const clientesRespuesta = await fetch(apiEnlace);
        this.clientes = await clientesRespuesta.json();
      },
    }
  }
</script>
<style>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  .clientes-tabla {
    width: 50%;
    margin-top: 20px;
  }

  .clientes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
