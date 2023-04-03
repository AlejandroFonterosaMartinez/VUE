<template>
    <div id="tabla-clientes">
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.id">
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.apellidos }}</td>
                    <td>{{ cliente.email }}</td>
                    <td>
                        <button class="btn btn-danger" @click="$emit('del-cliente', cliente.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "tabla-clientes",
    props: {
        clientes: Array,
    }
}
</script>

<style scoped></style>