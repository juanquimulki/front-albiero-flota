<template>
  <div>
    <b-modal
      v-model="showModal"
      close="close"
      title="Repuestos"
      @hide="doSomethingOnHidden"
      @show="doSomethingOnShow"
    >
      <b-form @submit="onSubmit" v-if="formShow" ref="form">
        <input :value="form.id" type="hidden" />
        <input :value="id_tarea" type="hidden" />
        <input :value="mantenimiento" type="hidden" />

        <b-form-group
          label="Repuesto:"
          description="Repuesto que se ha cambiado."
        >
          <b-form-select
            v-model="form.id_repuesto"
            :options="repuestos"
            required
          ></b-form-select>
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
      </b-table>

      <template #modal-footer>
        <b-button variant="outline-primary" @click="close">Cerrar</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Data from "../../data/data";

import makeToast from "../../common/toast";

export default {
  name: "ModalRepuestos",
  props: ["show", "id_tarea", "mantenimiento"],
  mixins: [Data],
  data() {
    return {
      showModal: false,
      formShow: true,

      form: {
        id: null,
        id_tarea: null,
        id_repuesto: null,
      },

      repuestos: [],

      btnGuardarDes: false,
      btnEliminarDes: true,
      btnNuevoDes: false,

      selected: false,

      items: [],
      fields: [
        {
          key: "repuesto.descripcion",
          label: "Repuesto",
        },
      ],
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
          ? "preventivo/repuesto"
          : "correctivo/repuesto";
      this.getData(endpoint, payload).then((response) => {
        this.items = response;
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
          ? "preventivo/repuesto"
          : "correctivo/repuesto";
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
          ? "preventivo/repuesto"
          : "correctivo/repuesto";
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
          ? "preventivo/repuesto"
          : "correctivo/repuesto";
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
        id_repuesto: null,
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
      this.getData("repuesto", null).then((response) => {
        this.repuestos = response.map((x) => {
          return { value: x.id, text: x.descripcion };
        });
      });
      this.buscarRegistros();
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
