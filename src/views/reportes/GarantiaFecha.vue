<template>
  <div>
    <h4>
      Reporte <b-icon icon="arrow-right-short"></b-icon> Vencimientos de
      Garantía por Fecha
    </h4>
    <br />

    <b-card>
      <b-row>
        <b-col cols="12" sm="12" md="6" lg="3" xl="3">
          <b-form-group
            label="Fecha:"
            description="Puedes cambiarla para visualizar alertas anticipadas."
          >
            <b-form-input type="date" v-model="fecha" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="6" lg="9" xl="9">
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
          <br />Reporte :: Vencimientos de Garantía por Fecha
        </div>
        <b-table :items="items" :fields="fields" responsive> </b-table>
      </div>
    </b-card>
  </div>
</template>

<script>
import Data from "../../data/data";
import moment from "moment";

export default {
  name: "Flota",
  mixins: [Data],
  data() {
    return {
      endpoint: "vehiculo",
      fecha: null,
      items: null,
      fields: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "tipo",
          label: "Tipo",
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
        {
          key: "anio",
          label: "Modelo",
        },
        {
          key: "fecha_venc_gtia",
          label: "Venc. Gtía.",
          formatter: "dateFormat",
        },
        {
          key: "apenom",
          label: "Chofer",
        },
        {
          key: "vencimiento",
          label: "Días Venc.",
        },
      ],
    };
  },
  methods: {
    dateFormat(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    print() {
      this.$htmlToPaper("printMe");
    },
    buscarRegistros() {
      let payload = { fecha: this.fecha };
      this.getData("reporte/garantiafecha", payload).then((response) => {
        this.items = response;
      });
    },
  },
  created() {
    this.fecha = moment().format("YYYY-MM-DD");
    this.buscarRegistros();
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
