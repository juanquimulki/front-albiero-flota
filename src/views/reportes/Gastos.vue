<template>
  <div>
    <h4>
      Reporte <b-icon icon="arrow-right-short"></b-icon> Gastos por Servicios
    </h4>
    <br />

    <b-card>
      <b-row>
        <b-col cols="12" sm="12" md="4" lg="3" xl="3">
          <b-form-group label="Vehículo:">
            <b-form-select
              v-model="id_vehiculo"
              :options="vehiculos"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="4" lg="3" xl="3">
          <b-form-group label="Desde:">
            <b-form-input type="date" v-model="desde" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="4" lg="3" xl="3">
          <b-form-group label="Hasta:">
            <b-form-input type="date" v-model="hasta" required></b-form-input>
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
          <br />Reporte :: Gastos por Servicios
        </div>

        <b-table :items="items" :fields="fields" responsive>
          <template #cell(resultado)="row">
            <b-badge
              v-if="row.item.resultado == 'CUMPLIMENTADO'"
              pill
              variant="primary"
              >{{ row.item.resultado }}</b-badge
            >
            <b-badge v-else pill variant="danger">{{
              row.item.resultado
            }}</b-badge>
          </template>
          <template #cell(mantenimiento)="row">
            <b-badge
              v-if="row.item.mantenimiento == 'PREVENTIVO'"
              variant="warning"
              >{{ row.item.mantenimiento }}</b-badge
            >
            <b-badge v-else variant="success">{{
              row.item.mantenimiento
            }}</b-badge>
          </template>
          <template #cell(total)="row">
            {{ row.item.total | formatMoneda }}
          </template>
        </b-table>

        <div class="total">
          <strong>Total: {{ total | formatMoneda }}</strong>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Data from "../../data/data";
import moment from "moment";

import makeToast from "../../common/toast";

export default {
  name: "Gastos",
  mixins: [Data],
  data() {
    return {
      endpoint: "vehiculo",

      id_vehiculo: null,
      desde: null,
      hasta: null,

      vehiculos: [],

      total: 0,

      items: null,
      fields: [
        {
          key: "descripcion",
          label: "Vehículo",
        },
        {
          key: "patente",
          label: "Patente",
        },
        {
          key: "parte",
          label: "Parte",
        },
        {
          key: "tarea",
          label: "Tarea",
        },
        {
          key: "fecha",
          label: "Fecha",
          formatter: "dateFormat",
        },
        {
          key: "mantenimiento",
          label: "Mantenimiento",
        },
        {
          key: "total",
          label: "Monto",
          formatter: "formatMoneda",
        },
      ],
    };
  },
  methods: {
    dateFormat(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    formatMoneda(val) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(val);
    },
    print() {
      this.$htmlToPaper("printMe");
    },
    buscarRegistros() {
      makeToast("Mostrando registros...", "success");

      let payload = {
        id_vehiculo: this.id_vehiculo,
        desde: this.desde,
        hasta: this.hasta,
      };
      this.getData("reporte/gastos", payload).then((response) => {
        this.items = response;

        this.total = this.items.reduce(function (acc, obj) {
          return acc + parseFloat(obj.total);
        }, 0);
      });
    },
  },
  filters: {
    dateFormat(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    formatMoneda(val) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(val);
    },
  },
  created() {
    this.getData("vehiculo", null).then((response) => {
      this.vehiculos = response.map((x) => {
        return {
          value: x.id,
          text: `${x.patente} - ${x.descripcion} (${x.alias})`,
        };
      });

      let valor = {
        value: 0,
        text: "(Todos...)",
      };

      this.vehiculos.unshift(valor);
      this.id_vehiculo = 0;
    });

    this.desde = moment().format("YYYY-MM-DD");
    this.hasta = moment().format("YYYY-MM-DD");
  },
};
</script>

<style scoped>
.botonera {
  margin-top: 30px;
}
.tituloReporte {
  display: none;
}
.total {
  float: right;
}
</style>
