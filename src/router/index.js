import Vue from "vue";
import VueRouter from "vue-router";

import Choferes from "../views/archivos/Choferes";
import Vehiculos from "../views/archivos/Vehiculos";
import GarantiaFecha from "../views/reportes/GarantiaFecha";
import Clave from "../views/usuarios/Clave";
import Usuarios from "../views/usuarios/Usuarios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/archivos/choferes",
    name: "choferes",
    component: Choferes,
  },
  {
    path: "/archivos/vehiculos",
    name: "vehiculos",
    component: Vehiculos,
  },
  {
    path: "/reportes/garantiafecha",
    name: "garantiafecha",
    component: GarantiaFecha,
  },
  {
    path: "/usuarios/clave",
    name: "clave",
    component: Clave,
  },
  {
    path: "/usuarios/usuarios",
    name: "usuarios",
    component: Usuarios,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
