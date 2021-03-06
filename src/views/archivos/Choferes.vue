<template>
  <div>
    <h4>Choferes</h4>
    <br />
    <b-row>
      <b-col order-xl="1" order-lg="1" order-md="1" order-sm="2" order="2">
        <b-card>
          <h5>Formulario</h5>
          <br />
          <div class="content-card">
            <b-form @submit="onSubmit" v-if="formShow" ref="form">
              <b-form-group
                label="Nombre completo:"
                description="Apellidos y nombres del chofer. Ej: PEREZ, Juan Carlos."
              >
                <b-form-input
                  v-model="form.apenom"
                  required
                  maxlength="50"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Abreviatura:"
                description="Nombre abreviado o alias del chofer. Ej: jperez."
              >
                <b-form-input
                  v-model="form.abrev"
                  required
                  maxlength="10"
                ></b-form-input>
              </b-form-group>
            </b-form>

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
                :items="registros"
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
  name: "Choferes",
  mixins: [Data],
  data() {
    return {
      endpoint: "chofer",
      registros: [],

      fields: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "apenom",
          label: "Nombre",
        },
        {
          key: "abrev",
          label: "Abreviatura",
        },
      ],

      form: {
        id: "",
        apenom: "",
        abrev: "",
      },
      formShow: true,
      showOverlay: false,

      selected: false,

      btnGuardarDes: false,
      btnEliminarDes: true,
      btnNuevoDes: false,
    };
  },
  methods: {
    guardar() {
      this.tabIndex = 0;
      this.$refs.form.requestSubmit();
    },
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
      this.showOverlay = false;
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
    buscarRegistros() {
      this.showOverlay = true;
      this.getData(this.endpoint, null)
        .then((response) => {
          this.registros = response;
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
    limpiar() {
      this.form = {
        id: "",
        apenom: "",
        abrev: "",
      };
      this.formShow = false;
      this.$nextTick(() => {
        this.formShow = true;
      });
      this.$refs.selectableTable.clearSelected();
    },
  },
  created() {
    this.buscarRegistros();
  },
  watch: {
    selected(valor) {
      this.btnEliminarDes = !valor;
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
  margin-bottom: 5px;
}
.alert {
  font-size: 10pt;
  padding: 10px;
  text-align: right;
}
</style>
