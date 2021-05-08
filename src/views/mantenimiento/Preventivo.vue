<template>
  <div>
    <h4>Preventivo <b-icon icon="arrow-right-short"></b-icon> Actividades</h4>
    <br />
    <b-row>
      <b-col order-xl="1" order-lg="1" order-md="1" order-sm="2" order="2">
        <b-card>
          <h5>Formulario</h5>
          <br />
          <div class="content-card">
            <b-form @submit="onSubmit" v-if="formShow" ref="form">
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-group label="Vehículo:">
                    <b-form-select
                      v-model="form.id_vehiculo"
                      :options="vehiculos"
                      required
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" sm="12" md="6" lg="6" xl="6">
                  <b-form-group label="Parte / Pieza:">
                    <b-form-select
                      v-model="form.id_parte"
                      :options="partes"
                      required
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="6" lg="6" xl="6">
                  <b-form-group label="Tarea:">
                    <b-form-select
                      v-model="form.id_tarea"
                      :options="tareas"
                      required
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                  <b-form-group label="Detalles:">
                    <b-form-textarea
                      v-model="form.detalles"
                      rows="3"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
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
                id="my-table"
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
                :per-page="perPage"
                :current-page="currentPage"
              ></b-table>
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
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
  name: "Tareas",
  mixins: [Data],
  data() {
    return {
      endpoint: "preventivo",
      registros: [],

      currentPage: 1,
      perPage: 10,

      fields: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "vehiculo.descripcion_alias",
          label: "Vehículo",
        },
        {
          key: "parte.parte",
          label: "Parte / Pieza",
        },
        {
          key: "tarea.tarea",
          label: "Tarea",
        },
      ],

      form: {
        id: null,
        id_vehiculo: null,
        id_parte: null,
        id_tarea: null,
        detalles: null,
      },
      formShow: true,
      showOverlay: false,

      selected: false,

      btnGuardarDes: false,
      btnEliminarDes: true,
      btnNuevoDes: false,

      vehiculos: [],
      partes: [],
      tareas: [],
    };
  },
  methods: {
    guardar() {
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
        id: null,
        id_vehiculo: null,
        id_parte: null,
        id_tarea: null,
        detalles: null,
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

    this.getData("vehiculo", null).then((response) => {
      this.vehiculos = response.map((x) => {
        return { value: x.id, text: `${x.descripcion} (${x.alias})` };
      });
    });
    this.getData("tarea", null).then((response) => {
      this.tareas = response.map((x) => {
        return { value: x.id, text: x.tarea };
      });
    });
    this.getData("parte", null).then((response) => {
      this.partes = response.map((x) => {
        return { value: x.id, text: x.parte };
      });
    });
  },
  watch: {
    selected(valor) {
      this.btnEliminarDes = !valor;
    },
  },
  computed: {
    rows() {
      return this.registros.length;
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
