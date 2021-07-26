<template>
  <div>
    <b-modal
      v-model="showModal"
      close="close"
      title="Facturas"
      @hide="doSomethingOnHidden"
      @show="doSomethingOnShow"
    >
      <b-form @submit="onSubmit" v-if="formShow" ref="form">
        <input :value="form.id" type="hidden" />
        <input :value="id_tarea" type="hidden" />
        <input :value="mantenimiento" type="hidden" />

        <b-form-group
          label="Número:"
          description="Número de la factura. Ej: 001-00012345."
        >
          <b-form-input
            v-model="form.numero"
            required
            maxlength="20"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Fecha:" description="Fecha de la factura.">
          <b-form-input
            v-model="form.fecha"
            type="date"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Proveedor:">
          <b-form-select
            v-model="form.id_proveedor"
            :options="proveedores"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Monto:">
          <b-form-input
            type="number"
            step=".01"
            v-model="form.monto"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>

      <div class="botoneraModal">
        <b-button @click="guardar" :disabled="btnGuardarDes">Guardar</b-button>
        <b-button variant="danger" :disabled="btnEliminarDes" @click="eliminar"
          >Eliminar</b-button
        >
        <b-button
          variant="outline-danger"
          :disabled="btnNuevoDes"
          @click="limpiar"
          >Nuevo</b-button
        >
      </div>

      <br />
      <b-table
        :items="items"
        :fields="fields"
        striped
        hover
        outlined
        small
        selectable
        select-mode="single"
        ref="selectableTable"
        @row-selected="onRowSelected"
      >
        <template #cell(fecha)="row">
          {{ row.item.fecha | dateFormat }}
        </template>
        <template #cell(monto)="row">
          {{ row.item.monto | formatMoneda }}
        </template>
      </b-table>

      <strong>Total: {{ total | formatMoneda }}</strong>

      <template #modal-footer>
        <b-button variant="outline-primary" @click="close">Cerrar</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Data from "../../data/data";

import moment from "moment";
import makeToast from "../../common/toast";

export default {
  name: "ModalFacturas",
  props: ["show", "id_tarea", "mantenimiento"],
  mixins: [Data],
  data() {
    return {
      showModal: false,
      formShow: true,

      form: {
        id: null,
        id_tarea: null,
        mantenimiento: null,
        numero: null,
        fecha: null,
        id_proveedor: null,
        monto: null,
      },

      proveedores: [],

      btnGuardarDes: false,
      btnEliminarDes: true,
      btnNuevoDes: false,

      selected: false,

      items: [],
      fields: [
        {
          key: "numero",
          label: "Número",
        },
        {
          key: "fecha",
          label: "Fecha",
          formatter: "dateFormat",
        },
        {
          key: "proveedor.razon_social",
          label: "Proveedor",
        },
        {
          key: "monto",
          label: "Monto",
          formatter: "formatMoneda",
        },
      ],

      total: 0,
    };
  },
  methods: {
    close() {
      this.showModal = false;
      this.$emit("estado", false);
    },
    onRowSelected(item) {
      if (item[0]) {
        Object.assign(this.form, item[0]);
        this.selected = true;
      } else {
        this.selected = false;
      }
    },
    buscarRegistros() {
      let payload = {
        id_tarea: this.id_tarea,
      };

      let endpoint =
        this.mantenimiento == "PREVENTIVO"
          ? "preventivo/factura"
          : "correctivo/factura";
      this.getData(endpoint, payload).then((response) => {
        this.items = response;
        this.total = this.items.reduce(function (acc, obj) {
          return acc + parseFloat(obj.monto);
        }, 0);
      });
    },
    guardar() {
      this.$refs.form.requestSubmit();
    },
    onSubmit(evt) {
      evt.preventDefault();

      this.form.id_tarea = this.id_tarea;

      if (this.form.id) {
        this.update();
      } else {
        this.insert();
      }
    },
    insert() {
      let endpoint =
        this.mantenimiento == "PREVENTIVO"
          ? "preventivo/factura"
          : "correctivo/factura";
      this.postData(endpoint, this.form)
        .then(() => {
          makeToast("¡Se ha guardado el registro!", "success");
          this.buscarRegistros();
          this.limpiar();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    update() {
      let endpoint =
        this.mantenimiento == "PREVENTIVO"
          ? "preventivo/factura"
          : "correctivo/factura";
      this.patchData(endpoint, this.form)
        .then(() => {
          makeToast("¡Se ha actualizado el registro!", "success");
          this.buscarRegistros();
          this.limpiar();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    eliminar() {
      let endpoint =
        this.mantenimiento == "PREVENTIVO"
          ? "preventivo/factura"
          : "correctivo/factura";
      this.deleteData(endpoint, this.form)
        .then(() => {
          makeToast("¡Se ha eliminado el registro!", "success");
          this.buscarRegistros();
          this.limpiar();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    limpiar() {
      this.form = {
        id: null,
        // id_tarea: null,
        // mantenimiento: null,
        fecha: null,
        numero: null,
        id_proveedor: null,
        monto: null,
      };
      this.formShow = false;
      this.$nextTick(() => {
        this.formShow = true;
      });
      this.$refs.selectableTable.clearSelected();
    },
    doSomethingOnHidden() {
      //do something
      this.close();
    },
    doSomethingOnShow() {
      //do something
      this.getData("proveedor", null).then((response) => {
        this.proveedores = response.map((x) => {
          return { value: x.id, text: x.razon_social };
        });
      });
      this.buscarRegistros();
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
  watch: {
    selected(valor) {
      this.btnEliminarDes = !valor;
    },
    show(valor) {
      this.showModal = valor;
    },
  },
};
</script>

<style>
.botoneraModal {
  text-align: right;
}
.botoneraModal button {
  margin-left: 5px;
  margin-bottom: 5px;
}
</style>
