<template>
  <div>
    <h4>Vehículos</h4>
    <br />

    <ChapaPatente :tipo="'moto'" :texto="'LXG764'" />
  </div>
</template>

<script>
import ChapaPatente from "../../components/ChapaPatente";

export default {
  name: "Vehiculos",
  components: { ChapaPatente },
  data() {
    return {};
  },
};
</script>

<style></style>
