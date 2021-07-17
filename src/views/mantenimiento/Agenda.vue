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
          <br />Preventivo :: Agenda <br /><br />
          Para la fecha: {{ fecha | dateFormat }}<br />
          Kilómetros anticipados: {{ kilometros }}
        </div>

        <h5>Preventivo por Fecha</h5>
        <br class="salto" />
        <b-table :items="registrosFecha" :fields="fieldsFecha" responsive>
          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="modalTarea(row.item, 1, 'P')"
              class="mr-1"
              title="Cumplimentar"
              variant="outline-primary"
            >
              <b-icon icon="clipboard-check" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              size="sm"
              @click="modalTarea(row.item, 0, 'P')"
              class="mr-1"
              title="Desestimar"
              variant="outline-danger"
            >
              <b-icon icon="trash" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              size="sm"
              @click="
                modalOrden(row.item, 'Mantenimiento Preventivo por Fecha')
              "
              class="mr-1"
              title="Orden de Servicio"
              variant="outline-success"
            >
              <b-icon icon="printer" aria-hidden="true"></b-icon>
            </b-button>
          </template> </b-table
        ><br class="salto" />

        <h5>Preventivo por Kilómetros</h5>
        <br class="salto" />
        <b-table
          :items="registrosKilometros"
          :fields="fieldsKilometros"
          responsive
        >
          <template #cell(kilometros)="row">
            {{ row.item.kilometros }} ({{ row.item.fecha_hora | dateFormat }})
          </template>

          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="modalTarea(row.item, 1, 'P')"
              class="mr-1"
              title="Cumplimentar"
              variant="outline-primary"
            >
              <b-icon icon="clipboard-check" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              size="sm"
              @click="modalTarea(row.item, 0, 'P')"
              class="mr-1"
              title="Desestimar"
              variant="outline-danger"
            >
              <b-icon icon="trash" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              size="sm"
              @click="
                modalOrden(row.item, 'Mantenimiento Preventivo por Kilómetros')
              "
              class="mr-1"
              title="Orden de Servicio"
              variant="outline-success"
            >
              <b-icon icon="printer" aria-hidden="true"></b-icon>
            </b-button>
          </template> </b-table
        ><br class="salto" />

        <h5>Mantenimiento Correctivo</h5>
        <br class="salto" />
        <b-table
          :items="registrosCorrectivo"
          :fields="fieldsCorrectivo"
          responsive
        >
          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="modalTarea(row.item, 1, 'C')"
              class="mr-1"
              title="Cumplimentar"
              variant="outline-primary"
            >
              <b-icon icon="clipboard-check" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              size="sm"
              @click="modalTarea(row.item, 0, 'C')"
              class="mr-1"
              title="Desestimar"
              variant="outline-danger"
            >
              <b-icon icon="trash" aria-hidden="true"></b-icon>
            </b-button>
            <b-button
              size="sm"
              @click="modalOrden(row.item, 'Mantenimiento Correctivo')"
              class="mr-1"
              title="Orden de Servicio"
              variant="outline-success"
            >
              <b-icon icon="printer" aria-hidden="true"></b-icon>
            </b-button>
          </template>
        </b-table>
      </div>
    </b-card>

    <b-modal v-model="modalTareaShow" :title="tituloModalTarea">
      <b-table stacked :items="tarea" borderless></b-table>
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

      <template #modal-footer>
        <b-button variant="primary" @click="aceptarTarea">Aceptar</b-button>
        <b-button variant="outline-primary" @click="modalTareaShow = false"
          >Cancelar</b-button
        >
      </template>
    </b-modal>

    <b-modal v-model="modalOrdenShow" :title="tituloModalOrden">
      <b-row>
        <b-col>
          <b-form-group label="Proveedor:">
            <b-form-select
              v-model="proveedor"
              :options="proveedores"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group label="Responsable:">
            <b-form-select v-model="chofer" :options="choferes"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <template #modal-footer>
        <b-button variant="primary" @click="printOrden">Imprimir</b-button>
        <b-button variant="outline-primary" @click="modalOrdenShow = false"
          >Cancelar</b-button
        >
      </template>

      <div id="printMeOrden" class="ordenServicio">
        <div class="ordenTitulo">ORDEN DE SERVICIO</div>
        <div class="ordenTexto">
          Autorizo a <strong>{{ this.chofer }}</strong> a solicitar a
          <strong>{{ this.proveedor }}</strong> el servicio de
          <strong>{{ orden.tarea }} - {{ orden.detalles }}</strong> en
          <strong>{{ orden.parte }}</strong> para el vehículo
          <strong>{{ orden.vehiculo }}</strong> debido a
          <strong>{{ orden.mantenimiento }}</strong
          >.
        </div>
        <div class="ordenFirma">
          Firma y Aclaración<br /><strong>ALBIERO HNOS. SRL</strong><br />{{
            orden.fecha
          }}
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Data from "../../data/data";
import moment from "moment";

import makeToast from "../../common/toast";

export default {
  name: "Agenda",
  mixins: [Data],
  data() {
    return {
      endpoint: "preventivo/agenda",
      fecha: null,
      kilometros: 0,

      registrosFecha: [],
      registrosKilometros: [],
      registrosCorrectivo: [],

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
          key: "patente",
          label: "Patente",
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
          key: "patente",
          label: "Patente",
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
          key: "kmsCalculados",
          label: "Kms. Calculados",
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

      fieldsCorrectivo: [
        {
          key: "id",
          label: "#",
        },
        {
          key: "descripcion_alias",
          label: "Vehículo",
        },
        {
          key: "patente",
          label: "Patente",
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
          key: "vencimientoDias",
          label: "Días Venc.",
        },
        {
          key: "vencimientoKms",
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
      modalOrdenShow: false,
      tituloModalTarea: null,
      tituloModalOrden: "Orden de Servicio",
      tarea: [],

      form: {
        id: null,
        fecha: null,
        kilometros: null,
        user: null,
        usuario: null,
        detalles: null,
        cumplimentado: null,
        mantenimiento: null,
      },
      orden: {},

      proveedores: [],
      proveedor: null,
      choferes: [],
      chofer: null,
    };
  },
  methods: {
    modalTarea(row, cumplimentado, mantenimiento) {
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
      this.form.fecha = moment().format("YYYY-MM-DD");
      this.form.kilometros = null;

      this.form.detalles = null;
      this.form.cumplimentado = cumplimentado;
      this.form.mantenimiento = mantenimiento;

      this.modalTareaShow = true;
    },
    modalOrden(row, mant) {
      this.orden = {
        responsable: "Juan Mulki",
        vehiculo: `${row.patente} - ${row.descripcion} (${row.alias})`,
        tarea: row.tarea,
        parte: row.parte,
        detalles: row.detalles,
        mantenimiento: mant,
        fecha: moment().format("DD/MM/YYYY"),
      };
      this.modalOrdenShow = true;
    },
    aceptarTarea() {
      if (this.validar()) {
        if (this.form.mantenimiento == "P") {
          this.postData("preventivo/tarea", this.form).then(() => {
            this.modalTareaShow = false;
            this.buscarRegistros();
          });
        } else {
          this.postData("correctivo/tarea", this.form).then(() => {
            this.modalTareaShow = false;
            this.buscarRegistros();
          });
        }
      } else {
        makeToast("Faltan ingresar algunos datos.", "warning");
      }
    },
    hasValue(dummy) {
      if (typeof dummy != "undefined" && dummy != null && dummy.trim() != "") {
        return true;
      }
      return false;
    },
    validar() {
      if (
        this.hasValue(this.form.fecha) &&
        this.hasValue(this.form.kilometros)
      ) {
        return true;
      } else {
        return false;
      }
    },
    buscarRegistros() {
      makeToast("Mostrando registros...", "success");
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
      this.getData("correctivo/agenda", null).then((response) => {
        this.registrosCorrectivo = response;
      });
    },
    print() {
      this.$htmlToPaper("printMe");
    },
    printOrden() {
      this.$htmlToPaper("printMeOrden");
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

    this.getData("proveedor", null).then((response) => {
      this.proveedores = response.map((x) => {
        return { value: x.razon_social, text: x.razon_social };
      });
    });
    this.getData("chofer", null).then((response) => {
      this.choferes = response.map((x) => {
        return { value: x.apenom, text: x.apenom };
      });
    });
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
