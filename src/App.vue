<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="#">
        <span style="margin-left: 10px">Mantenimiento de Flota</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Archivos" right>
            <b-dropdown-item href="#"
              ><router-link to="/archivos/choferes"
                >Choferes</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link to="/archivos/vehiculos"
                >Vehículos</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Reportes" right>
            <b-dropdown-item href="#"
              ><router-link to="/reportes/garantiafecha"
                >Vencimiento de garantías por fecha</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Usuarios" right>
            <b-dropdown-item href="#"
              ><router-link to="/usuarios/usuarios"
                >Gestión de Usuarios</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link to="/usuarios/clave"
                >Cambiar mi Clave</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
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
