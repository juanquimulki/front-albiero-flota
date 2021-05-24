<template>
  <div>
    <h4>
      Reporte <b-icon icon="arrow-right-short"></b-icon> Vencimientos de
      Garantía
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
        <b-col cols="12" sm="12" md="6" lg="3" xl="3">
          <b-form-group
            label="Kilómetros:"
            description="Puedes cambiarlos para calcular kilómetros antes de su cumplimiento."
          >
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
          <br />Reporte :: Vencimientos de Garantía<br /><br />
          Para la fecha: {{ fecha | dateFormat }}<br />
          Kilómetros anticipados: {{ kilometros }}
        </div>

        <h5>Por Fecha</h5>
        <br class="salto" />
        <b-table :items="itemsFecha" :fields="fieldsFecha" responsive> </b-table
        ><br class="salto" />

        <h5>Por Kilómetros</h5>
        <br class="salto" />
        <b-table :items="itemsKms" :fields="fieldsKms" responsive>
          <template #cell(kilometros)="row">
            {{ row.item.kilometros }} ({{ row.item.fecha_hora | dateFormat }})
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
  name: "Garantia",
  mixins: [Data],
  data() {
    return {
      endpoint: "vehiculo",
      fecha: null,
      kilometros: 0,

      itemsFecha: null,
      fieldsFecha: [
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
          key: "apenom",
          label: "Chofer",
        },
        {
          key: "fecha_venc_gtia",
          label: "Venc. Gtía.",
          formatter: "dateFormat",
        },
        {
          key: "vencimiento",
          label: "Días Venc.",
        },
      ],

      itemsKms: null,
      fieldsKms: [
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
          key: "apenom",
          label: "Chofer",
        },
        {
          key: "kilometros",
          label: "Kms. Actuales",
        },
        {
          key: "kmsCalculados",
          label: "Kms. Calculados",
        },
        {
          key: "kms_venc_gtia",
          label: "Venc. Gtía.",
        },
        {
          key: "vencimiento",
          label: "Kms Venc.",
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
      makeToast("Mostrando registros...", "success");

      this.getData("reporte/garantiafecha", { fecha: this.fecha }).then(
        (response) => {
          this.itemsFecha = response;
        }
      );

      this.getData("reporte/garantiakms", { kilometros: this.kilometros }).then(
        (response) => {
          this.itemsKms = response;
        }
      );
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

<style scoped>
.botonera {
  margin-top: 30px;
}
.tituloReporte {
  display: none;
}
</style>
