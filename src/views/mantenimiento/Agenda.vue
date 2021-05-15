<template>
  <div>
    <h4>Agenda</h4>
    <br />

    <b-card>
      <b-row>
        <b-col cols="12" sm="12" md="6" lg="3" xl="3">
          <b-form-group
            label="Fecha:"
            description="Puedes cambiarla para visualizar alertas anticipadas."
          >
            <b-form-input
              type="date"
              v-model="fecha"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="6" lg="3" xl="3">
          <b-form-group label="Kilómetros anticipados:">
            <b-form-input
              type="number"
              v-model="kilometros"
              required
            ></b-form-input>
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
          <br />Agenda
        </div>
        <b-table :items="registros" :fields="fields" responsive> </b-table>
      </div>
    </b-card>
  </div>
</template>

<script>
import Data from "../../data/data";
import moment from "moment";

export default {
  name: "Agenda",
  mixins: [Data],
  data() {
    return {
      fecha: null,
      kilometros: 500,

      endpoint: "agenda",
      registros: [],

      fields: [
        {
          key: "key1",
          label: "Vehículo",
        },
        {
          key: "key2",
          label: "Parte",
        },
        {
          key: "key3",
          label: "Tarea",
        },
        {
          key: "key4",
          label: "Detalles",
        },
        {
          key: "key5",
          label: "Frec. Días",
        },
        {
          key: "key6",
          label: "Últ. Fecha",
        },
        {
          key: "key7",
          label: "Días Venc.",
        },
      ],
    };
  },
  methods: {
    buscarRegistros() {
      this.getData(this.endpoint + "/fecha", this.fecha).then((response) => {
        this.registros = response;
      });
    },
    print() {
      this.$htmlToPaper("printMe");
    },
  },
  created() {
    this.fecha = moment().format("YYYY-MM-DD");
    //this.buscarRegistros();
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
