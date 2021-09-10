<template>
  <div>
    <h4>General <b-icon icon="arrow-right-short"></b-icon> Agenda</h4>
    <br />

    <b-card>
      <b-row>
        <b-col cols="12" sm="12" md="6" lg="3" xl="3">
          <b-form-group label="Fecha:" description="Mes y año a visualizar.">
            <b-form-input type="date" v-model="fecha" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="6" lg="3" xl="3">
          <div class="botonera">
            <b-button @click="buscarRegistros" variant="info"
              ><b-icon icon="search"></b-icon>&nbsp;Consultar</b-button
            >&nbsp;
            <b-button @click="print" variant="success"
              ><b-icon-file-text></b-icon-file-text>&nbsp;Imprimir</b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <div id="printMe">
        <div class="tituloReporte">
          ALBIERO SISTEMAS - Mantenimiento de Flota
          <br />General :: Agenda <br /><br />
          Para la fecha: {{ fecha | dateFormat }}
        </div>

        <b-table :items="registros" :fields="fields" responsive>
          <template #cell(hecho)="row">
            <b-badge v-if="row.item.hecho == 1" variant="primary"
              >HECHO</b-badge
            >
            <!-- <b-badge v-else variant="success">{{
              row.item.mantenimiento
            }}</b-badge> -->
          </template>

          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="cumplimentar(row.item.id)"
              class="mr-1"
              title="Cumplimentar Sí/No"
              variant="outline-primary"
            >
              <b-icon icon="clipboard-check" aria-hidden="true"></b-icon>
            </b-button>
          </template>
        </b-table>
      </div>
    </b-card>
  </div>
</template>

<script>
import Data from "../../data/data";
import moment from "moment";

import makeToast from "../../common/toast";

export default {
  name: "GeneralAgenda",
  mixins: [Data],
  data() {
    return {
      endpoint: "general",
      fecha: null,

      registros: [],
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
          key: "vehiculo.patente",
          label: "Patente",
        },
        {
          key: "detalles",
          label: "Detalles",
        },
        {
          key: "fecha",
          label: "Fecha",
          formatter: "dateFormat",
        },
        {
          key: "hecho",
          label: "Hecho",
        },
        {
          key: "actions",
          label: "Acciones",
          tdClass: "columnaOculta",
          thClass: "columnaOculta",
        },
      ],
    };
  },
  methods: {
    buscarRegistros() {
      makeToast("Mostrando registros...", "success");
      this.getData(this.endpoint + "/agenda", { fecha: this.fecha }).then(
        (response) => {
          this.registros = response;
        }
      );
    },
    cumplimentar(id) {
      this.patchData(this.endpoint + "/agenda", { id }).then(() => {
        this.buscarRegistros();
      });
    },
    print() {
      this.$htmlToPaper("printMe");
    },
    dateFormat(value) {
      return moment(value).format("DD/MM/YYYY");
    },
  },
  filters: {
    dateFormat(value) {
      return moment(value).format("DD/MM/YYYY");
    },
  },
  created() {
    this.fecha = moment().format("YYYY-MM-DD");
    this.buscarRegistros();
  },
};
</script>

<style>
.botonera {
  margin-top: 30px;
}
.tituloReporte {
  display: none;
}
.ordenServicio {
  display: none;
}
</style>
