<template>
  <h1>Crea un nuevo cliente:</h1>
  <form @submit.prevent="crear">
    <h3 v-if="mensaje">
      {{ mensaje }}
    </h3>
    <div class="formulario-campos">
      <label class="formulario-campos_etiqueta">
        Nombre:
        <input
          class="formulario-campos_input"
          v-model="nombre"
          type="text"
          name="nombre"
          placeholder="Nombre"
          required="required"
        />
      </label>
      <label class="formulario-campos_etiqueta">
        Telefono:
        <input
          class="formulario-campos_input"
          v-model="telefono"
          type="tel"
          name="telefono"
          placeholder="Telefono"
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
  const apiEnlace = 'http://localhost:8081/cliente/agregar';
  export default {
    name: 'App',
    data() {
      return {
        nombre: '',
        telefono: '',
        mensaje: '',
      };
    },
    methods: {
      async crear() {
        this.mensaje = '';
        await fetch(
          apiEnlace,
          {
            method: 'post',
            body: (
              JSON.stringify({
                nombre: this.nombre,
                telefono: this.telefono
              })
            ),
            headers: {
              'Content-Type': 'application/json'
            },
          }
        );
        this.nombre = '';
        this.telefono = '';
        this.mensaje = 'Cliente creado :D';
      }
    }
  }
</script>
<style>
  .formulario-campos {
    display: flex;
    flex-direction: column;
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
