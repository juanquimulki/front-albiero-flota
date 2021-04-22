<template>
  <div>
    <h4>Bienvenid@ a la Aplicación!</h4>
    <br />

    <b-row>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2">
        <Widget
          :texto="'Vehículos'"
          :numero="vehiculos"
          :icono="'person-square'"
          :link="'archivos/vehiculos'"
          :overlay="busyVehiculos"
        />
      </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2">
        <Widget
          :texto="'Choferes'"
          :numero="choferes"
          :icono="'person-square'"
          :link="'archivos/choferes'"
          :overlay="busyChoferes"
        />
      </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2"> </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2"> </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2"> </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2">
        <Widget
          :texto="'Usuarios'"
          :numero="usuarios"
          :icono="'person-square'"
          :link="'usuarios/usuarios'"
          :overlay="busyUsuarios"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Data from "../data/data";
import Widget from "../components/Widget";

export default {
  name: "Dashboard",
  mixins: [Data],
  components: { Widget },
  data() {
    return {
      vehiculos: 0,
      choferes: 0,
      usuarios: 0,

      busyVehiculos: true,
      busyChoferes: true,
      busyUsuarios: true,
    };
  },
  created() {
    this.getData("vehiculo", null).then((response) => {
      this.vehiculos = response.length.toString().padStart(4, "0");
      this.busyVehiculos = false;
    });
    this.getData("chofer", null).then((response) => {
      this.choferes = response.length.toString().padStart(4, "0");
      this.busyChoferes = false;
    });
    this.getData("usuario", null).then((response) => {
      this.usuarios = response.length.toString().padStart(4, "0");
      this.busyUsuarios = false;
    });
  },
};
</script>

<style>
.card {
  margin-bottom: 15px;
}
</style>
