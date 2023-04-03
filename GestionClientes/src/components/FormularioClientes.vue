<template>
    <div id="formulario-clientes">
        <form class="mb-3" @submit.prevent="envioForm">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Nombre</label>
                            <input ref="nombre" v-model="cliente.nombre" type="text" class="form-control"
                                :class="{ 'is-invalid': procesando && nombreInvalido }" @focus="resetEstado"
                                @keypress="resetEstado">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Apellido</label>
                            <input ref="apellido" v-model="cliente.apellidos" type="text" class="form-control"
                                :class="{ 'is-invalid': procesando && apellidoInvalido }" @focus="resetEstado">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Email</label>
                            <input ref="email" v-model="cliente.email" type="text" class="form-control"
                                :class="{ 'is-invalid': procesando && emailInvalido }" @focus="resetEstado">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <button class="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div v-if="error && procesando" class="alert alert-danger" role="alert">
                            Debes rellenar todos los campos
                        </div>
                        <div v-if="correcto" class="alert alert-danger" role="alert">
                            Cliente añadido correctamente
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "FormularioClientes",
    data() {
        return {
            cliente: {
                id: 0,
                nombre: "",
                apellidos: "",
                email: "",
            }
        }
    },
    computed: {
        nombreInvalido() {
            return this.cliente.nombre.length < 1;
        },
        apellidoInvalido() {
            return this.cliente.apellidos.length < 1;
        },
        emailInvalido() {
            return this.cliente.email.length < 1;
        },
    },
    methods: {
        envioForm() {
            this.procesando = true;
            this.resetEstado();

            //comprobamos la presencia de errores
            if (this.nombreInvalido | this.apellidoInvalido | this.emailInvalido) {
                this.error = true;
                return;
            }
            this.$emit('add-persona', this.cliente);
            this.$refs.nombre.focus();
            this.error = false;
            this.correcto = true;
            this.procesando = false;
            this.clientes = {
                nombre: "",
                persona: "",
                apellido: "",
                email: "",
            }
            console.log('Formulario enviado');
            //this.$emit('add-cliente', this.cliente);
        },

        resetEstado() {
            this.correcto = false;
            this.error = false;
        },

        
    }
}
</script>

<style scoped></style>