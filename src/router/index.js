import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import Choferes from "../views/archivos/Choferes";
import Vehiculos from "../views/archivos/Vehiculos";
import GarantiaFecha from "../views/reportes/GarantiaFecha";
import Clave from "../views/usuarios/Clave";
import Usuarios from "../views/usuarios/Usuarios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
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

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !router.app.$session.exists())
    next({ name: "login" });
  else next();
});

export default router;
