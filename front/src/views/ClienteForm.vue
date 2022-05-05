<template>
  <h1>Crea un nuevo cliente:</h1>
  <form @submit.prevent="crear">
    <h3 v-if="mensaje">
      {{ mensaje }}
    </h3>
    <input
      v-model="nombre"
      type="text"
      name="nombre"
      placeholder="Nombre"
      required="required"
    />
    <input
      v-model="telefono"
      type="tel"
      name="telefono"
      placeholder="Telefono"
      required="required"
    />
    <button>Crear</button>
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
