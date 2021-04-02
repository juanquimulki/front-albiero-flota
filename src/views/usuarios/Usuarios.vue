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
                <b-form @submit="onSubmit" v-if="formShow" ref="form">
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
                    description="Nombre completo de la persona que ingresará al sistema."
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
              <b-button @click="guardar" :disabled="btnGuardarDes"
                >Guardar</b-button
              >
              <b-button
                variant="danger"
                :disabled="btnEliminarDes"
                @click="eliminar"
                >Eliminar</b-button
              >
              <b-button
                variant="outline-danger"
                :disabled="btnNuevoDes"
                @click="limpiar"
                >Nuevo</b-button
              >
              <b-button variant="danger" :disabled="btnClaveDes" @click="reestablecer">
                <b-icon icon="key" aria-hidden="true"></b-icon> Reestablecer
                Clave
              </b-button>
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
                selectable
                select-mode="single"
                ref="selectableTable"
                @row-selected="onRowSelected"
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
import msgBoxConfirm from "../../common/confirm";

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
        id: "",
        user: "",
        name: "",
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

      selected: false,
      btnGuardarDes: false,
      btnEliminarDes: true,
      btnNuevoDes: false,
      btnClaveDes: true,
    };
  },
  methods: {
    nuevo() {
      this.limpiar();
    },
    eliminar() {
      msgBoxConfirm("Eliminar", "¿Deseas borrar el registro?").then((valor) => {
        if (valor) {
          this.delete();
        }
      });
    },
    reestablecer() {
      this.showOverlay = true;
      this.form.pass = "1234";
      this.patchData(this.endpoint, this.form)
        .then(() => {
          makeToast("¡Se ha reestablecido la clave!", "success");
          this.buscarRegistros();
          this.limpiar();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.showOverlay = false;
        });
    },
    onRowSelected(item) {
      if (item[0]) {
        Object.assign(this.form, item[0]);
        this.selected = true;
      } else {
        this.selected = false;
      }
    },
    onSubmit(evt) {
      evt.preventDefault();

      if (this.form.id) {
        this.update();
      } else {
        this.insert();
      }
    },
    insert() {
      this.showOverlay = true;
      this.postData(this.endpoint, this.form)
        .then(() => {
          makeToast("¡Se ha guardado el registro!", "success");
          this.buscarRegistros();
          this.limpiar();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.showOverlay = false;
        });
    },
    update() {
      this.showOverlay = true;
      this.patchData(this.endpoint, this.form)
        .then(() => {
          makeToast("¡Se ha actualizado el registro!", "success");
          this.buscarRegistros();
          this.limpiar();
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.showOverlay = false;
        });
    },
    delete() {
      this.showOverlay = true;
      this.deleteData(this.endpoint, this.form)
        .then(() => {
          makeToast("¡Se ha eliminado el registro!", "success");
          this.buscarRegistros();
          this.limpiar();
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
    limpiar() {
      this.form = {
        id: "",
        user: "",
        name: "",
      };
      this.formShow = false;
      this.$nextTick(() => {
        this.formShow = true;
      });
      this.$refs.selectableTable.clearSelected();
    },
    buscarRegistros() {
      this.showOverlay = true;
      this.getData(this.endpoint, null)
        .then((response) => {
          this.usuarios = response;
        })
        .finally(() => {
          this.showOverlay = false;
        });
    },
  },
  created() {
    this.buscarRegistros();
  },
  watch: {
    selected(valor) {
      this.btnEliminarDes = !valor;
      this.btnClaveDes = !valor;
    },
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
.botonera button {
  margin-bottom: 5px;
}
</style>
