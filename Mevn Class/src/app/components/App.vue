<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a href="/" class="navbar-brand">Inicio</a>
    </div>
  </nav>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-8">
        <table class="table table-bordered">
          <thead>
            <tr>
              <td>TAREA</td>
              <td>DESCRIPCIÓN</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tarea of tareas">
              <td>{{ tarea.titulo }}</td>
              <td>{{ tarea.descripcion }}</td>
              <td>
                <button
                  @click="bajaTarea(tarea._id)"
                  class="btn btn-danger btn-sm"
                >
                  Eliminar</button
                >&nbsp;
                <button
                  @click="editarTarea(tarea._id)"
                  class="btn btn-secondary btn-sm"
                >
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="altaTarea">
              <div class="form-group mb-3">
                <input
                  type="text"
                  v-model="tarea.titulo"
                  placeholder="Nueva Tarea"
                  class="form-control"
                />
              </div>
              <br />
              <div class="form-group mb-3">
                <textarea
                  cols="30"
                  row="20"
                  v-model="tarea.descripcion"
                  class="form-control"
                  placeholder="Descripción Tarea"
                ></textarea>
              </div>
              <template v-if="editar === false">
                <div class="d-grid gap-2">
                  <button clas="btn btn-primary">Guardar</button>
                </div>
              </template>
              <template v-else>
                <button class="btn btn-primary btn-warning">Actualizar</button
                >&nbsp;
                <button
                  @click="listarTareas()"
                  class="btn btn-primary btn-ligth"
                >
                  Cancelar
                </button>
              </template>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
//crear la clase Tarea
class Tarea {
  constructor(titulo, descripcion) {
    this.titulo = titulo;
    this.descripcion = descripcion;
  }
}

export default {
  data() {
    return {
      tarea: new Tarea(),
      tareas: [],
      editar: false,
    };
  },
  created() {
    this.listarTareas();
  },
  methods: {
    editarTarea(id) {
      fetch("/api/tareas/" + id)
        .then((res) => res.json())
        .then((data) => {
          this.tarea = new Tarea(data.titulo, data.descripcion);
          this.editar = true;
          this.tareaEditarid = data._id;
        });
    },
    bajaTarea(id) {
      fetch("/api/tareas/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.listarTareas();
        });
    },
    listarTareas() {
      fetch("/api/tareas")
        .then((res) => res.json())
        .then((data) => {
          this.tareas = data;
        });
    },
    altaTarea() {
      if (this.editar === false) {
        fetch("/api/tareas", {
          method: "POST",
          body: JSON.stringify(this.tarea),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => this.listarTareas());
      } else {
        fetch("/api/tareas/" + this.tareaEditarid, {
          method: "PUT",
          body: JSON.stringify(this.tarea),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.listarTareas();
            this.editar = false;
          });
      }
      this.tarea = new Tarea();
    },
  },
};
</script>