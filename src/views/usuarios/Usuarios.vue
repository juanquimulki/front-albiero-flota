<template>
  <div>
    <h4>Gestión de Usuarios</h4>
    <br />
    <b-row>
      <b-col order-lg="1" order-md="2" order-sm="1" class="margin-bottom">
        <b-card>
          <h5 class="subtitulo">Formulario</h5>
          <div class="content-card">
            <b-tabs content-class="mt-3" card>
              <b-tab title="Usuario" active>
                <b-form @submit="onSubmit" @reset="onReset" v-if="formShow">
                  <b-form-group
                    label="Usuario:"
                    description="Nombre de usuario de la persona que ingresará al sistema."
                  >
                    <b-form-input
                      v-model="form.user"
                      required
                      maxlength="20"
                      style="width: 30%"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Nombre:"
                    description="Nombre completo de la persona que ingresará al sistema"
                  >
                    <b-form-input
                      v-model="form.name"
                      required
                      maxlength="50"
                    ></b-form-input>
                  </b-form-group>
                </b-form>
              </b-tab>
              <b-tab title="Permisos">Permisos</b-tab>
            </b-tabs>
          </div>
        </b-card>
      </b-col>
      <b-col order-lg="2" order-md="1" order-sm="2">
        <b-card>
          <h5 class="subtitulo">Registros</h5>

          <div class="content-card">
            <b-table
              striped
              hover
              :items="usuarios"
              :fields="fields"
              outlined
              small
            ></b-table>
          </div>
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
      formShow: true,
      form: {
        user: null,
        name: null,
      },
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
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      //this.limpiar();
      // Trick to reset/clear native browser form validation state
      this.formShow = false;
      this.$nextTick(() => {
        this.formShow = true;
      });
    },
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

<style scoped>
.subtitulo {
  /*border-bottom: 1px solid gray;*/
  margin-bottom: 20px;
}
.content-card {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
