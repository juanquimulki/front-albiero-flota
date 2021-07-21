<template>
  <div>
    <h4>
      Más Datos (para cumplimentaciones)
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
            >
          </div>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
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
        </b-table>
    </b-card>
    </div>
</template>

<script>
import Data from "../../data/data";
import moment from "moment";

import makeToast from "../../common/toast";

export default {
  name: "MasDatos",
  mixins: [Data],
  data() {
    return {
      endpoint: "vehiculo",

      id_vehiculo: null,
      desde: null,
      hasta: null,

      vehiculos: [],

      items: null,
      fields: [
        {
          key: "descripcion",
          label: "Vehículo",
        },
        {
          key: "abrev",
          label: "Chofer",
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
          key: "detallesMantenimiento",
          label: "Detalles",
        },
        {
          key: "resultado",
          label: "Resultado",
        },
        {
          key: "user",
          label: "Usuario",
        },
        {
          key: "fecha",
          label: "Fecha",
          formatter: "dateFormat",
        },
        {
          key: "kilometros",
          label: "Kilómetros",
        },
        {
          key: "detallesTarea",
          label: "Detalles",
        },
        {
          key: "mantenimiento",
          label: "Mantenimiento",
        },
      ],
    };
  },
  methods: {
    dateFormat(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    buscarRegistros() {
      makeToast("Mostrando registros...", "success");

      let payload = {
        id_vehiculo: this.id_vehiculo,
        desde: this.desde,
        hasta: this.hasta,
        cumplimentado: 1
      };
      this.getData("reporte/historial", payload).then((response) => {
        this.items = response;
        console.log(JSON.stringify(this.items));
      });
    },
  },
  filters: {
    dateFormat(value) {
      return moment(value).format("DD/MM/YYYY");
    },
  },
  created() {
    this.getData("vehiculo", null).then((response) => {
      this.vehiculos = response.map((x) => {
        return { value: x.id, text: `${x.descripcion} (${x.alias})` };
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
</style>