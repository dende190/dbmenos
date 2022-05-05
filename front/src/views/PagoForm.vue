<template>
  <h1>Crea un nuevo pago:</h1>
  <form @submit.prevent="crear">
    <h3 v-if="mensaje">
      {{ mensaje }}
    </h3>
    <select name="clienteId" v-model="clienteId">
      <option v-for="cliente in clientes" :value="cliente.id" :key="cliente.id">
        {{ cliente.nombre }}
      </option>
    </select>
    <input
      v-model="monto"
      type="number"
      name="monto"
      placeholder="Monto"
      required="required"
    />
    <button>Crear</button>
  </form>
</template>
<script>
  const apiClienteEnlace = 'http://localhost:8081/cliente/obtenerTodos';
  const apiPagoEnlace = 'http://localhost:8081/pago/agregar';
  export default {
    name: 'App',
    data() {
      return {
        mensaje: '',
        clientes: {},
        clienteId: 0,
        monto: 0,
      };
    },
    created() {
      this.obtenerClientes();
    },
    methods: {
      async obtenerClientes() {
        const clientesRespuesta = await fetch(apiClienteEnlace);
        this.clientes = await clientesRespuesta.json();
      },
      async crear() {
        this.mensaje = '';
        await fetch(
          apiPagoEnlace,
          {
            method: 'post',
            body: (
              JSON.stringify({
                clienteId: this.clienteId,
                monto: this.monto,
              })
            ),
            headers: {
              'Content-Type': 'application/json'
            },
          }
        );

        this.monto = 0;
        this.mensaje = 'Pago creado con exito :D';
      }
    }
  }
</script>
