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
          <b-form-group
            label="Kilómetros:"
            description="Anticipación en kilómetros antes de su cumplimiento."
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
          <br />Preventivo :: Agenda <br /><br />
          Para la fecha: {{ fecha | dateFormat }}<br />
          Kilómetros anticipados: {{ kilometros }}
        </div>

        <h5>Vencimientos por Fecha</h5>
        <br class="salto" />
        <b-table :items="registrosFecha" :fields="fieldsFecha" responsive>
          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="modalTarea(row.item, 1)"
              class="mr-1"
              title="Cumplimentar"
              variant="outline-primary"
            >
              <b-icon icon="clipboard-check" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              size="sm"
              @click="modalTarea(row.item, 0)"
              class="mr-1"
              title="Desestimar"
              variant="outline-danger"
            >
              <b-icon icon="trash" aria-hidden="true"></b-icon>
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
          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="modalTarea(row.item, 1)"
              class="mr-1"
              title="Cumplimentar"
              variant="outline-primary"
            >
              <b-icon icon="clipboard-check" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              size="sm"
              @click="modalTarea(row.item, 0)"
              class="mr-1"
              title="Desestimar"
              variant="outline-danger"
            >
              <b-icon icon="trash" aria-hidden="true"></b-icon>
            </b-button>
          </template>
        </b-table>
      </div>
    </b-card>

    <b-modal v-model="modalTareaShow" :title="tituloModalTarea">
      <b-table stacked :items="tarea" borderless></b-table>

      <!-- <b-row>
        <b-col cols="12" sm="12" md="6" lg="6" xl="6">
          <b-form-group label="Id:">
            <b-form-input type="text" v-model="form.id" disabled></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="6" lg="6" xl="6">
          <b-form-group label="User:">
            <b-form-input
              type="text"
              v-model="form.user"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row> -->
      <b-row>
        <b-col>
          <b-form-group label="Usuario:">
            <b-form-input
              type="text"
              v-model="form.usuario"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" sm="12" md="6" lg="6" xl="6">
          <b-form-group label="Fecha:">
            <b-form-input
              type="date"
              v-model="form.fecha"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="6" lg="6" xl="6">
          <b-form-group label="Kilómetros:">
            <b-form-input
              type="number"
              v-model="form.kilometros"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
          <b-form-group label="Detalles:">
            <b-form-textarea v-model="form.detalles" rows="3"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col cols="12" sm="12" md="6" lg="6" xl="6">
          <b-form-group label="Cumplimentado:">
            <b-form-input
              type="text"
              v-model="form.cumplimentado"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row> -->

      <template #modal-footer>
        <b-button variant="primary">Aceptar</b-button>
        <b-button variant="outline-primary" @click="modalTareaShow = false"
          >Cancelar</b-button
        >
      </template>
    </b-modal>
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
          key: "id",
          label: "#",
        },
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
          key: "id",
          label: "#",
        },
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
        {
          key: "actions",
          label: "Acciones",
          tdClass: "columnaOculta",
          thClass: "columnaOculta",
        },
      ],

      modalTareaShow: false,
      tituloModalTarea: null,
      tarea: [],

      form: {
        id: null,
        fecha: null,
        kilometros: null,
        user: null,
        usuario: null,
        detalles: null,
        cumplimentado: null,
      },
    };
  },
  methods: {
    modalTarea(row, cumplimentado) {
      if (cumplimentado) {
        this.tituloModalTarea = "Cumplimentar Tarea";
      } else {
        this.tituloModalTarea = "Desestimar Tarea";
      }

      let info = {
        Vehículo: `${row.descripcion} (${row.alias})`,
        Parte: row.parte,
        Tarea: row.tarea,
        Detalles: row.detalles,
      };
      this.tarea = [];
      this.tarea.push(info);

      this.form.id = row.id;
      this.form.user = this.$session.get("user");
      this.form.usuario = `${this.$session.get("name")} (${this.$session.get(
        "user"
      )})`;
      this.detalles = "";
      this.form.cumplimentado = cumplimentado;

      this.modalTareaShow = true;
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
</style>
