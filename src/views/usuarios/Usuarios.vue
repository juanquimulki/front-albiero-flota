<template>
  <div>
    <h4>Gestión de Usuarios</h4>
    <br />
    <b-row>
      <b-col order-lg="1" order-md="2" order-sm="1" class="margin-bottom">
        hola
      </b-col>
      <b-col order-lg="2" order-md="1" order-sm="2">
        <b-card>
          <h5 class="subtitulo">Registros</h5>

          <b-table
            striped
            hover
            :items="usuarios"
            :fields="fields"
            outlined
            small
          ></b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Data from "../../data/data";

export default {
  name: "Usuarios",
  mixins: [Data],
  data() {
    return {
      endpoint: "usuario",
      usuarios: [],
      fields: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "user",
          label: "Usuario",
        },
        {
          key: "name",
          label: "Nombre",
        },
      ],
    };
  },
  created() {
    this.getData(this.endpoint, null).then((response) => {
      this.usuarios = response;
      console.log(JSON.stringify(this.usuarios));
      //this.menu = this.menu.filter((item) => item.options.length > 0);
    });
  },
};
</script>

<style></style>
