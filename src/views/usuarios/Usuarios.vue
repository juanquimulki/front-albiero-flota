<template>
  <div>
    <h4>Gestión de Usuarios</h4>
    <br />
    <b-row>
      <b-col order-xl="1" order-lg="1" order-md="1" order-sm="2" order="2">
        <b-card>
          <h5 class="subtitulo">Formulario</h5>
          <div class="content-card">
            <b-tabs content-class="mt-3" card>
              <b-tab title="Usuario" active>
                <b-alert show variant="info"
                  >Revisá los permisos del usuario en la solapa correspondiente
                  antes de guardar.</b-alert
                >
                <b-form
                  @submit="onSubmit"
                  @reset="onReset"
                  v-if="formShow"
                  ref="form"
                >
                  <b-form-group
                    label="Usuario:"
                    description="Nombre de usuario (abreviado) de la persona que ingresará al sistema."
                  >
                    <b-form-input
                      v-model="form.user"
                      required
                      maxlength="20"
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
                <b-alert show variant="warning"
                  >La contraseña por defecto del usuario será "1234". Se
                  recomienda cambiarla luego de iniciar sesión.</b-alert
                >
              </b-tab>
              <b-tab title="Permisos">Permisos</b-tab>
            </b-tabs>

            <div class="botonera">
              <b-overlay
                :show="showOverlay"
                rounded
                opacity="0.6"
                spinner-small
                class="d-inline-block"
              >
                <b-button @click="guardar">Guardar</b-button>
              </b-overlay>
              <b-button variant="danger">Eliminar</b-button>
              <b-button variant="outline-danger">Nuevo</b-button>
            </div>
          </div>
        </b-card>
      </b-col>

      <b-col
        order-xl="2"
        order-lg="2"
        order-md="2"
        order-sm="1"
        order="1"
        style="margin-bottom: 10px"
      >
        <b-overlay :show="showOverlay" rounded="sm">
          <b-card>
            <div class="card-title">Registros</div>
            <div class="card-subtitle">
              Hacé click sobre una fila para más opciones...
            </div>

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
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Data from "../../data/data";
import makeToast from "../../common/toast";

export default {
  name: "Usuarios",
  mixins: [Data],
  data() {
    return {
      endpoint: "usuario",
      usuarios: [],
      formShow: true,
      showOverlay: false,
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

      this.showOverlay = true;
      this.postData(this.endpoint, this.form)
        .then(() => {
          makeToast("¡Registro guardado con éxito!", "success");
          this.buscarRegistros();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.showOverlay = false;
        });
    },
    guardar() {
      this.$refs.form.requestSubmit();
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
    buscarRegistros() {
      this.getData(this.endpoint, null).then((response) => {
        this.usuarios = response;
        console.log(JSON.stringify(this.usuarios));
        //this.menu = this.menu.filter((item) => item.options.length > 0);
      });
    },
  },
  created() {
    this.buscarRegistros();
  },
};
</script>

<style scoped>
.card-title {
  font-size: 15pt;
  margin: 0px;
}
.card-subtitle {
  font-size: 10pt;
  color: gray;
  margin-top: 0px;
  margin-bottom: 20px;
}
/* .subtitulo {
  margin-bottom: 20px;
} */
.content-card {
  margin-left: 7px;
  margin-right: 7px;
}
.botonera {
  text-align: right;
}
.botonera button {
  margin-left: 5px;
}
.alert {
  font-size: 10pt;
  padding: 10px;
  text-align: right;
}
</style>
