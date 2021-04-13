<template>
  <div>
    <h4>Bienvenid@ a la Aplicación!</h4>
    <br />

    <b-row>
      <b-col>
        <Widget
          :texto="'Vehículos'"
          :numero="'0001'"
          :icono="'person-square'"
          :link="'archivos/vehiculos'"
        />
      </b-col>
      <b-col>
        <Widget
          :texto="'Choferes'"
          :numero="'0001'"
          :icono="'person-square'"
          :link="'archivos/choferes'"
        />
      </b-col>
      <b-col> </b-col>
      <b-col> </b-col>
      <b-col>
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

<style></style>
