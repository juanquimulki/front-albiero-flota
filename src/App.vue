<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="/dashboard">
        <span style="margin-left: 10px">Mantenimiento de Flota</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav v-if="$session.exists()">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            class="mimenu"
            v-for="item in menu"
            :key="item.id"
            :text="item.label"
            right
          >
            <b-dropdown-item disabled>{{ usuario }} </b-dropdown-item>
            <b-dropdown-item
              href="#"
              v-for="subitem in item.options"
              :key="subitem.id"
              ><router-link :to="subitem.link" class="miopcion">{{
                subitem.label
              }}</router-link></b-dropdown-item
            >
            <b-dropdown-item
              href="#"
              v-if="item.label == 'Usuarios'"
              @click="cerrarSesion"
              class="miopcion"
              ><b-icon icon="door-closed"></b-icon>&nbsp;Cerrar
              Sesión</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Data from "./data/data";

export default {
  name: "App",
  mixins: [Data],
  data() {
    return {
      endpoint: "menu",
      menu: [],
      usuario: "hola",
    };
  },
  created() {
    let user = this.$session.user;
    this.getData(this.endpoint, { user }).then((response) => {
      this.menu = response;
    });
    this.usuario =
      this.$session.get("name") + " (" + this.$session.get("user") + ")";
  },
  methods: {
    cerrarSesion() {
      this.$session.destroy();
      this.$router.push("/");
    },
  },
};
</script>

<style>
body {
  background-color: #e5e5e5 !important;
}
nav.navbar {
  background-color: #db0000 !important;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
    inset 0 -1px 5px rgba(0, 0, 0, 0.25);
}
li.mimenu a {
  color: white !important;
}
a.dropdown-item a.miopcion {
  color: black !important;
  text-decoration: none !important;
}
a.dropdown-item.disabled {
  color: gray !important;
}
li.miopcion a {
  color: black !important;
  text-decoration: none !important;
}
#content {
  padding: 30px;
  padding-top: 100px;
}
</style>
