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
            <b-form-input type="date" v-model="fecha" required></b-form-input>
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
          <br />Preventivo :: Agenda
        </div>

        <h5>Vencimientos por Fecha</h5>
        <br class="salto" />
        <b-table :items="registrosFecha" :fields="fieldsFecha" responsive>
          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="alerta(row.item.descripcion_alias)"
              class="mr-1"
            >
              Info modal
            </b-button>
          </template> </b-table
        ><br class="salto" />

        <h5>Vencimientos por Kilómetros</h5>
        <br class="salto" />
        <b-table
          :items="registrosKilometros"
          :fields="fieldsKilometros"
          responsive
        >
        </b-table>
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

      endpoint: "preventivo/agenda",
      registrosFecha: [],
      registrosKilometros: [],

      fieldsFecha: [
        {
          key: "descripcion_alias",
          label: "Vehículo",
        },
        {
          key: "parte",
          label: "Parte / Pieza",
        },
        {
          key: "tarea",
          label: "Tarea",
        },
        {
          key: "detalles",
          label: "Detalles",
        },
        {
          key: "frecuenciaDias",
          label: "Frec. Días",
        },
        {
          key: "ultimaFecha",
          label: "Últ. Fecha",
          formatter: "dateFormat",
        },
        {
          key: "vencimiento",
          label: "Días Venc.",
        },
        {
          key: "actions",
          label: "Acciones",
          tdClass: "columnaOculta",
          thClass: "columnaOculta",
        },
      ],

      fieldsKilometros: [
        {
          key: "descripcion_alias",
          label: "Vehículo",
        },
        {
          key: "parte",
          label: "Parte / Pieza",
        },
        {
          key: "tarea",
          label: "Tarea",
        },
        {
          key: "detalles",
          label: "Detalles",
        },
        {
          key: "kilometros",
          label: "Kms. Actuales",
        },
        {
          key: "fecha_hora",
          label: "Desde",
          formatter: "dateFormat",
        },
        {
          key: "frecuenciaKms",
          label: "Frec. Kms",
        },
        {
          key: "ultimoKms",
          label: "Últ. Kms.",
        },
        {
          key: "vencimiento",
          label: "Kms. Venc.",
        },
      ],
    };
  },
  methods: {
    alerta(valor) {
      alert(valor);
    },
    dateFormat(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    buscarRegistros() {
      this.getData(this.endpoint + "/fecha", { fecha: this.fecha }).then(
        (response) => {
          this.registrosFecha = response;
        }
      );
      this.getData(this.endpoint + "/kilometros", {
        kilometros: this.kilometros,
      }).then((response) => {
        this.registrosKilometros = response;
      });
    },
    print() {
      this.$htmlToPaper("printMe");
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
</style>
