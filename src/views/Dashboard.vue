<template>
  <div>
    <h4>Bienvenid@ a la Aplicación!</h4>
    <br />

    <b-row>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2">
        <Widget
          :texto="'Vehículos'"
          :numero="'0001'"
          :icono="'person-square'"
          :link="'archivos/vehiculos'"
        />
      </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2">
        <Widget
          :texto="'Choferes'"
          :numero="'0001'"
          :icono="'person-square'"
          :link="'archivos/choferes'"
        />
      </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2"> </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2"> </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2"> </b-col>
      <b-col cols="12" sm="12" md="6" lg="2" xl="2">
        <Widget
          :texto="'Usuarios'"
          :numero="'0001'"
          :icono="'person-square'"
          :link="'usuarios/usuarios'"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "../components/Widget";

export default {
  name: "Dashboard",
  components: { Widget },
};
</script>

<style>
.card {
  margin-bottom: 15px;
}
</style>
