<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="#">
        <span style="margin-left: 10px">Mantenimiento de Flota</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            v-for="item in menu"
            :key="item.id"
            :text="item.label"
            right
          >
            <b-dropdown-item
              href="#"
              v-for="subitem in item.options"
              :key="subitem.id"
              ><router-link :to="subitem.link">{{
                subitem.label
              }}</router-link></b-dropdown-item
            >
            <b-dropdown-item
              href="#"
              v-if="item.label == 'Usuarios'"
              @click="cerrarSesion"
              ><b-icon icon="door-closed"></b-icon>&nbsp;Cerrar
              Sesión</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div id="content">
      Hola Mundo!<br />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menu: [
        {
          id: 1,
          label: "Archivos",
          options: [
            {
              id: 1,
              label: "Choferes",
              link: "/archivos/choferes",
            },
            {
              id: 2,
              label: "Vehículos",
              link: "/archivos/vehiculos",
            },
          ],
        },
        {
          id: 2,
          label: "Reportes",
          options: [
            {
              id: 1,
              label: "Vencimientos de Garantía por Fecha",
              link: "/reportes/garantiafecha",
            },
          ],
        },
        {
          id: 3,
          label: "Usuarios",
          options: [
            {
              id: 1,
              label: "Gestión de Usuarios",
              link: "/usuarios/usuarios",
            },
            {
              id: 2,
              label: "Cambiar mi Clave",
              link: "/usuarios/clave",
            },
          ],
        },
      ],
    };
  },
  methods: {
    cerrarSesion() {
      alert("cerrar sesión");
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
#content {
  padding: 30px;
  padding-top: 100px;
}
a.nav-link {
  color: white !important;
}
a {
  color: black !important;
  text-decoration: none !important;
}
a.navbar-brand {
  color: white !important;
}
</style>
