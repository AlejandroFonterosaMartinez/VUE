<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>CLIENTES</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <FormularioClientes @add-persona="addCliente" />
        <TablaClientes :clientes="clientes" @del-cliente="deleteCliente" />
        <div v-if="!clientes.length" class="alert alert-info" role="alert">
          No se han agregado clientes
        </div>
        <div v-else>
          <button @click="destroyClients">DESTROY</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TablaClientes from './components/TablaClientes.vue';
import FormularioClientes from './components/FormularioClientes.vue';

export default {
  name: 'App',
  components: {
    TablaClientes,
    FormularioClientes
  },
  data() {
    return {
      clientes: [
        {
          id: 1,
          nombre: 'Lou',
          apellidos: 'Reed',
          email: 'lreed@email.com',
        },
        {
          id: 2,
          nombre: 'Patti',
          apellidos: 'Smith',
          email: 'psmith@email.com',
        },
        {
          id: 3,
          nombre: 'Janis',
          apellidos: 'Joplin',
          email: 'jjoplin@email.com',
        }
      ]
    }
  },
  methods: {
    addCliente(cliente) {
      let id = 0;
      if (this.clientes.length > 0) {
        id = this.clientes[this.clientes.length - 1].id + 1;
      } else {
        id = 1;
      }

      let clienteNuevo =
      {
        id: id,
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        email: cliente.email
      }
      this.clientes = [...this.clientes, clienteNuevo];
    },
    deleteCliente(id) {
      this.clientes = this.clientes.filter(
        cliente => cliente.id !== id
      )
    },
    destroyClients() {
      this.clientes = [];
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
