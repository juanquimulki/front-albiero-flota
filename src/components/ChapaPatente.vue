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
  created() {
    switch (this.tipo) {
      case "auto":
        if (this.texto.length == 6) {
          this.clase = "chapa-vieja-auto";
        } else if (this.texto.length == 7) {
          this.clase = "chapa-nueva-auto";
        }
        break;
      case "moto":
        break;
    }
    this.clase = "chapa-vieja-auto";
    this.imagen = this.imagenChapaViejaAuto;
    this.matricula = "LXG 777";
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
}

.chapa-nueva-auto {
  width: 200px;
  /*height: 100px;*/
  color: black;
  font-weight: bold;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  padding-top: 14px;
  font-size: 26pt;
  font-family: "Courier New", Courier, monospace;
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
}

.chapa-nueva-moto {
  width: 145px;
  height: 130px;
  color: black;
  font-weight: bold;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: center;
  padding-top: 30px;
  font-size: 32pt;
  font-family: "Courier New", Courier, monospace;
  line-height: 1;
}
</style>