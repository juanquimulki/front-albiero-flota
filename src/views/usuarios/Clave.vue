<template>
  <div>
    <h4>Cambiar mi Clave</h4>
    <br />
    <b-card>
      <h4>{{ $session.get("name") }}</h4>
      <h5>({{ $session.get("user") }})</h5>
      <br />
      <b-form @submit="onSubmit">
        <b-form-group label="Clave Actual:">
          <b-form-input
            v-model="form.pass"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Nueva Clave:">
          <b-form-input
            v-model="form.nueva"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Confirmación de Clave:">
          <b-form-input
            v-model="form.confirmacion"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <div style="text-align: right">
          <b-overlay
            :show="busy"
            rounded
            opacity="0.6"
            spinner-small
            spinner-variant="primary"
            class="d-inline-block"
          >
            <b-button type="submit" variant="primary" class="float-right"
              >Cambiar</b-button
            >
          </b-overlay>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Data from "../../data/data";
import makeToast from "../../common/toast";

export default {
  name: "Clave",
  mixins: [Data],
  data() {
    return {
      form: {
        user: this.$session.get("user"),
        pass: "",
        nueva: "",
        confirmacion: "",
      },

      busy: false,
    };
  },
  methods: {
    onSubmit(evt) {
      this.busy = true;
      evt.preventDefault();
      this.patchData("usuario/clave", this.form).then((response) => {
        if (response.success) {
          this.alertVariant = "success";
          makeToast("Su clave ha sido cambiada.", "success");
          this.busy = false;
        } else {
          this.alertVariant = "danger";
          switch (response.code) {
            case 1:
              makeToast("La clave actual no es correcta.", "warning");
              this.busy = false;
              break;
            case 2:
              makeToast(
                "La nueva clave y su confirmación no coinciden.",
                "warning"
              );
              this.busy = false;
              break;
            default:
              makeToast(response.message, "danger");
              this.busy = false;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 350px;
  margin: auto;
  margin-top: 20px;
}
.descripcion {
  font-size: 10pt;
  color: gray;
}
</style>
