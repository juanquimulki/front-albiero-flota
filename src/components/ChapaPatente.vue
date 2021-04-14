<template>
  <div>
    <div
      :class="clase"
      v-bind:style="{ 'background-image': 'url(' + imagen + ')' }"
    >
      {{ matricula }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ChapaPatente",
  props: ["tipo", "texto"],
  data() {
    return {
      imagenChapaViejaAuto: require("../assets/chapa_vieja_auto.jpg"),
      imagenChapaNuevaAuto: require("../assets/chapa_nueva_auto.jpg"),
      imagenChapaViejaMoto: require("../assets/chapa_vieja_moto.jpg"),
      imagenChapaNuevaMoto: require("../assets/chapa_nueva_moto.jpg"),

      clase: "",
      imagen: "",
      matricula: "",
    };
  },
  watch: {
    texto(valor) {
      switch (this.tipo) {
        case "auto":
          if (valor.length == 6) {
            this.clase = "chapa-vieja-auto";
            this.imagen = this.imagenChapaViejaAuto;
            this.matricula =
              valor.substring(0, 3) + " " + valor.substring(3, 6);
          } else if (valor.length == 7) {
            this.clase = "chapa-nueva-auto";
            this.imagen = this.imagenChapaNuevaAuto;
            this.matricula =
              valor.substring(0, 2) +
              " " +
              valor.substring(2, 5) +
              " " +
              valor.substring(5, 7);
          } else {
            this.clase = "";
            this.imagen = "";
            this.matricula = "";
          }
          break;
        case "moto":
          if (valor.length == 6) {
            this.clase = "chapa-vieja-moto";
            this.imagen = this.imagenChapaViejaMoto;
            this.matricula =
              valor.substring(0, 3) + "\n" + valor.substring(3, 6);
          } else if (valor.length == 7) {
            this.clase = "chapa-nueva-moto";
            this.imagen = this.imagenChapaNuevaMoto;
            this.matricula =
              valor.substring(0, 3) + "\n" + valor.substring(3, 7);
          } else {
            this.clase = "";
            this.imagen = "";
            this.matricula = "";
          }
          break;
      }
    },
  },
};
</script>

<style>
.chapa-vieja-auto {
  width: 200px;
  height: 90px;
  color: white;
  font-weight: bold;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  padding-top: 14px;
  font-size: 32pt;
  font-family: "Courier New", Courier, monospace;
  text-transform: uppercase;
}

.chapa-nueva-auto {
  margin-top: 10px;
  width: 210px;
  height: 80px;
  color: black;
  font-weight: bold;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  padding-top: 14px;
  font-size: 26pt;
  font-family: "Courier New", Courier, monospace;
  text-transform: uppercase;
}

.chapa-vieja-moto {
  width: 150px;
  height: 120px;
  color: white;
  font-weight: bold;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  padding-top: 25px;
  font-size: 32pt;
  font-family: "Courier New", Courier, monospace;
  line-height: 1;
  text-transform: uppercase;
}

.chapa-nueva-moto {
  width: 145px;
  height: 120px;
  color: black;
  font-weight: bold;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  padding-top: 30px;
  font-size: 32pt;
  font-family: "Courier New", Courier, monospace;
  line-height: 1;
  text-transform: uppercase;
}
</style>
