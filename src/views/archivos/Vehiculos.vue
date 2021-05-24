<template>
  <div>
    <h4>Vehículos</h4>
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
                  <b-form-group label="Tipo:">
                    <b-form-select
                      v-model="form.id_tipo"
                      :options="vehiculos_tipos"
                      required
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-group
                    label="Descripción:"
                    description="Marca y modelo detallados del vehículo."
                  >
                    <b-form-input
                      v-model="form.descripcion"
                      required
                      maxlength="50"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-group
                    label="Alias:"
                    description="Nombre informal identificatorio del vehículo. Ej.: Camioneta blanca de Juan."
                  >
                    <b-form-input
                      v-model="form.alias"
                      maxlength="30"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <b-form-group label="Chapa Patente:">
                    <b-form-input
                      v-model="form.patente"
                      maxlength="7"
                      style="text-transform: uppercase"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <ChapaPatente :tipo="form.id_tipo" :texto="form.patente" />
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="6" sm="6" md="6" lg="6" xl="6">
                  <b-form-group
                    label="Modelo:"
                    description="Año de fabricación del vehículo."
                  >
                    <b-form-input
                      v-model="form.anio"
                      maxlength="4"
                      type="number"
                      min="1900"
                      max="2100"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="6" sm="6" md="6" lg="6" xl="6">
                  <b-form-group label="Vencimiento de Garantía (Fecha):">
                    <b-form-input
                      v-model="form.fecha_venc_gtia"
                      type="date"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-group label="Chofer Principal:">
                    <b-form-select
                      v-model="form.id_chofer"
                      :options="choferes"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-group
                    label="Combustible:"
                    description="Tipo de combustible que utiliza el vehículo."
                  >
                    <b-form-select
                      v-model="form.id_tipo_comb"
                      :options="combustible_tipos"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-group
                    label="Kilometraje:"
                    description="Obtenido de la última actulización de Kilometraje."
                  >
                    <b-form-input v-model="kilometraje" disabled></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-group
                    label="Vencimiento de Garantía (Kms.):"
                    description="Un número entero, y no las fracciones de kilómetro."
                  >
                    <b-form-input
                      type="number"
                      v-model="form.kms_venc_gtia"
                      maxlength="50"
                      min="1"
                      max="1000000"
                    ></b-form-input>
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
import moment from "moment";

import makeToast from "../../common/toast";
import msgBoxConfirm from "../../common/confirm";

import ChapaPatente from "../../components/ChapaPatente";

export default {
  name: "Vehiculos",
  components: { ChapaPatente },
  mixins: [Data],
  data() {
    return {
      endpoint: "vehiculo",
      registros: [],

      vehiculos_tipos: [],
      choferes: [],
      combustible_tipos: [],

      fields: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "descripcion",
          label: "Descripción",
        },
        {
          key: "alias",
          label: "Alias",
        },
        {
          key: "patente",
          label: "Patente",
        },
      ],

      form: {
        id: null,
        id_tipo: null,
        descripcion: null,
        alias: null,
        patente: null,
        id_tipo_comb: null,
        anio: null,
        fecha_venc_gtia: null,
        kms_venc_gtia: null,
        id_chofer: null,
      },
      formShow: true,
      showOverlay: false,
      kilometraje: "",

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

        this.buscarKilometraje(this.form.id);
      } else {
        this.selected = false;
      }
    },
    limpiar() {
      this.form = {
        id: null,
        id_tipo: null,
        descripcion: null,
        alias: null,
        patente: null,
        id_tipo_comb: null,
        anio: null,
        fecha_venc_gtia: null,
        kms_venc_gtia: null,
        id_chofer: null,
      };
      this.kilometraje = "";
      this.formShow = false;
      this.$nextTick(() => {
        this.formShow = true;
      });
      this.$refs.selectableTable.clearSelected();
    },
    buscarKilometraje(id_vehiculo) {
      this.getData("kilometraje/vehiculo", { id_vehiculo }).then((response) => {
        if (response.length > 0) {
          this.kilometraje =
            response[0].kilometros +
            " kms (desde el " +
            moment(response[0].fecha_hora).format("DD/MM/YYYY") +
            ")";
        } else {
          this.kilometraje = "(sin datos...)";
        }
      });
    },
  },
  created() {
    this.buscarRegistros();

    this.getData("vehiculotipo", null).then((response) => {
      this.vehiculos_tipos = response.map((x) => {
        return { value: x.id, text: x.tipo };
      });
    });
    this.getData("chofer", null).then((response) => {
      this.choferes = response.map((x) => {
        return { value: x.id, text: `(${x.abrev}) - ${x.apenom}` };
      });
    });
    this.getData("combustibletipo", null).then((response) => {
      this.combustible_tipos = response.map((x) => {
        return { value: x.id, text: x.tipo };
      });
    });
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
