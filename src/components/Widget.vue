<template>
  <b-overlay :show="overlay" rounded="lg">
    <b-card @click="rutear()">
      <b-row>
        <b-col md="3" sm="3" cols="3" lg="4">
          <b-icon :icon="icono"></b-icon>
        </b-col>
        <b-col md="9" sm="9" cols="9" lg="8">
          <h5>{{ texto }}</h5>
          <div class="numero">{{ numero }}</div>
        </b-col>
      </b-row>
    </b-card>
  </b-overlay>
</template>

<script>
export default {
  name: "Widget",
  props: ["texto", "numero", "icono", "link", "overlay"],
  methods: {
    rutear() {
      this.$router.push(this.link);
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  border-left: 4px solid red;
}
.card:hover {
  cursor: pointer;
  background-color: rgb(245, 245, 230);
  border-color: rgb(170, 170, 170);
}
.numero {
  font-size: 24pt;
  font-weight: bold;
  float: right;
}
.b-icon {
  font-size: 54pt;
  color: gray;
  margin-top: 3px;
}
</style>
