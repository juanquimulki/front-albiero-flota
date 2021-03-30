<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="#">
        <span style="margin-left: 10px">Mantenimiento de Flota</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Opciones" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div id="content">Hola Mundo!</div>
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
</style>
