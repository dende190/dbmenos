<template>
  <h1>Crea un nuevo pago:</h1>
  <form @submit.prevent="crear">
    <h3 v-if="mensaje">
      {{ mensaje }}
    </h3>
    <div class="formulario-campos">
      <select
        name="clienteId"
        v-model="clienteId"
        class="formulario-campos_seleccionador"
      >
        <option selected="selected" value="0">
          Selecciona un cliente
        </option>
        <option
          v-for="cliente in clientes"
          :value="cliente.id"
          :key="cliente.id"
        >
          {{ cliente.nombre }}
        </option>
      </select>
      <label class="formulario-campos_etiqueta">
        Monto:
        <input
          class="formulario-campos_input"
          v-model="monto"
          type="number"
          name="monto"
          placeholder="Monto"
          required="required"
        />
      </label>
    </div>
    <button class="formulario-campos_boton">
      Crear
    </button>
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
        monto: '',
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
        if (!this.clienteId) {
          return;
        }

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

        this.monto = '';
        this.mensaje = 'Pago creado con exito :D';
      }
    }
  }
</script>
<style>
  .formulario-campos {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .formulario-campos_seleccionador {
    width: 250px;
    margin-bottom: 8px;
    background: #f5f5f5;
    border: 1px solid black;
    border-radius: 10px;
    height: 25px;
    padding: 2px 8px;
    margin-left: 4px;
    font-size: 14px;
  }

  .formulario-campos_etiqueta {
    margin-bottom: 8px;
  }

  .formulario-campos_input {
    background: #f5f5f5;
    border: 1px solid black;
    border-radius: 10px;
    height: 25px;
    padding: 2px 8px;
    margin-left: 4px;
    font-size: 14px;
  }

  .formulario-campos_boton {
    margin-top: 5px;
    width: 255px;
    height: 32px;
    border-radius: 20px;
    border: 1px solid black;
    font-size: 16px;
    cursor: pointer;
  }
</style>
