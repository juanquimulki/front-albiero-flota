<template>
  <div>
    <b-modal
      v-model="show"
      close="close"
      title="Facturas"
      @hide="doSomethingOnHidden"
      @show="doSomethingOnShow"
    >
      <b-form
        @submit="onSubmitFactura"
        v-if="formFacturasShow"
        ref="formFacturas"
      >
        <b-form-group label="id_tarea:">
          <b-form-input v-model="id_tarea"></b-form-input>
        </b-form-group>
        <b-form-group label="mantenimiento:">
          <b-form-input v-model="mantenimiento"></b-form-input>
        </b-form-group>

        <b-form-group
          label="Número:"
          description="Número de la factura. Ej: 001-00012345."
        >
          <b-form-input
            v-model="formFactura.numero"
            required
            maxlength="20"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Proveedor:">
          <b-form-select
            v-model="formFactura.id_proveedor"
            :options="proveedores"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Monto:">
          <b-form-input
            type="number"
            step=".01"
            v-model="formFactura.monto"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>

      <div class="botoneraModal">
        <b-button @click="guardarFactura" :disabled="btnGuardarFacturaDes"
          >Guardar</b-button
        >
        <b-button
          variant="danger"
          :disabled="btnEliminarFacturaDes"
          @click="eliminarFactura"
          >Eliminar</b-button
        >
        <b-button
          variant="outline-danger"
          :disabled="btnNuevoFacturaDes"
          @click="limpiarFactura"
          >Nuevo</b-button
        >
      </div>

      <br />
      <b-table
        :items="itemsFacturas"
        :fields="fieldsFacturas"
        striped
        hover
        outlined
        small
        selectable
        select-mode="single"
        ref="selectableTableFacturas"
        @row-selected="onRowSelectedFacturas"
      >
        <template #cell(monto)="row">
          {{ row.item.monto | formatMoneda }}
        </template>
      </b-table>

      <strong>Total: {{ totalFacturas | formatMoneda }}</strong>

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
      formFacturasShow: true,
      formFactura: {
        id: null,
        id_tarea: null,
        mantenimiento: null,
        numero: null,
        id_proveedor: null,
        monto: null,
      },
      proveedores: [],
      btnGuardarFacturaDes: false,
      btnEliminarFacturaDes: true,
      btnNuevoFacturaDes: false,

      itemsFacturas: [],
      fieldsFacturas: [
        {
          key: "numero",
          label: "Número",
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

      totalFacturas: 0,
    };
  },
  methods: {
    close() {
      this.$emit("estado", false);
    },
    onRowSelectedFacturas() {},
    buscarRegistrosFacturas() {
      let payload = {
        id_tarea: this.id_tarea,
      };
      this.getData("preventivo/factura", payload).then((response) => {
        this.itemsFacturas = response;
        this.totalFacturas = this.itemsFacturas.reduce(function (acc, obj) {
          return acc + parseFloat(obj.monto);
        }, 0);
      });
    },
    guardarFactura() {
      this.$refs.formFacturas.requestSubmit();
    },
    onSubmitFactura(evt) {
      evt.preventDefault();

      if (this.formFactura.id) {
        this.updateFactura();
      } else {
        this.insertFactura();
      }
    },
    insertFactura() {
      this.postData("preventivo/factura", this.formFactura)
        .then(() => {
          makeToast("¡Se ha guardado el registro!", "success");
          this.buscarRegistrosFacturas();
          this.limpiarFactura();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    update() {
      this.patchData("factura", this.formFactura)
        .then(() => {
          makeToast("¡Se ha actualizado el registro!", "success");
          this.limpiarFactura();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    eliminarFactura() {},
    limpiarFactura() {
      this.formFactura = {
        id: null,
        // id_tarea: null,
        // mantenimiento: null,
        numero: null,
        id_proveedor: null,
        monto: null,
      };
      this.formFacturaShow = false;
      this.$nextTick(() => {
        this.formFacturaShow = true;
      });
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
      this.buscarRegistrosFacturas();
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
