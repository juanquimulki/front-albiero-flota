<template>
  <div>
    <h4>Reporte <b-icon icon="arrow-right-short"></b-icon> Mi Flota</h4>
    <br />

    <b-card>
      <b-button @click="print" variant="success" style="float: right"
        ><b-icon-file-text></b-icon-file-text>&nbsp;Imprimir</b-button
      ><br /><br />
      <div id="printMe">
        <div class="tituloReporte">
          ALBIERO SISTEMAS - Mantenimiento de Flota
          <br />Reporte :: Mi Flota
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
      items: null,
      fields: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "tipo.tipo",
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
          key: "chofer.apenom",
          label: "Chofer",
        },
        {
          key: "estado.estado",
          label: "Estado",
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
  },
  created() {
    this.getData(this.endpoint, null).then((response) => {
      this.items = response;
    });
  },
};
</script>

<style scoped>
.tituloReporte {
  display: none;
}
</style>
