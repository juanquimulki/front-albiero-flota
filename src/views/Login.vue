<template>
  <div class="contenido">
    <b-card class="shadow">
      <img :src="url_logo" width="85" class="float-right" />
      <legend>¡Hola!</legend>
      <br />
      <br />
      <b-form @submit="onSubmit">
        <b-form-group label="Usuario:">
          <b-form-input v-model="form.user" required></b-form-input>
        </b-form-group>

        <b-form-group label="Clave:">
          <b-form-input
            v-model="form.pass"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-row>
          <b-col>
            <span class="descripcion">Ingreso al sistema...</span>
          </b-col>
          <b-col style="text-align: right">
            <b-overlay
              :show="busy"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
              class="d-inline-block"
            >
              <b-button type="submit" variant="primary">Entrar</b-button>
            </b-overlay>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <br />
    <transition name="slide-fade">
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="danger"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <b>Error:</b>
        {{ message }}
      </b-alert>
    </transition>
  </div>
</template>

<script>
import _axios from "../common/apiClient";

export default {
  name: "Login",
  data() {
    return {
      url_logo: require("../assets/albiero.jpg"),
      form: {
        user: "",
        pass: "",
      },

      dismissSecs: 3,
      dismissCountDown: 0,
      message: "",

      busy: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.busy = true;
      setTimeout(this.ahora, 0);
    },
    ahora() {
      let timeStamp = new Date().getTime();
      _axios
        .get("usuario/login/" + timeStamp, { params: this.form })
        .then((response) => {
          if (response.data.success) {
            this.$session.start();
            this.$session.set("user", this.form.user);
            this.$session.set("name", response.data.name);
            this.$session.set("token", response.data.token);
            this.$session.set("menu", response.data.menu);
            this.$emit("setMenu");
            this.$router.push("dashboard");
          } else {
            if (response.data.code == 1) {
              this.showAlert("El usuario no existe.");
            } else if (response.data.code == 2) {
              this.showAlert("La clave no es correcta.");
            } else if (response.data.code == 3) {
              this.showAlert("La aplicación ha expirado.");
            }
          }
          this.busy = false;
        });
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(message) {
      this.message = message;
      this.dismissCountDown = this.dismissSecs;
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
.alert {
  max-width: 300px;
  margin: auto;
}

/*.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
} */
</style>
