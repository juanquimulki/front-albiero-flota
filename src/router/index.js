import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import Choferes from "../views/archivos/Choferes";
import Vehiculos from "../views/archivos/Vehiculos";
import Kilometraje from "../views/vehiculos/Kilometraje";
import Partes from "../views/vehiculos/Partes";
import Tareas from "../views/vehiculos/Tareas";
import Preventivo from "../views/mantenimiento/Preventivo";
import Correctivo from "../views/mantenimiento/Correctivo";
import Agenda from "../views/mantenimiento/Agenda";
import Flota from "../views/reportes/Flota";
import GarantiaFecha from "../views/reportes/GarantiaFecha";
import Clave from "../views/usuarios/Clave";
import Usuarios from "../views/usuarios/Usuarios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: { opcion: 0 },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { opcion: 0 },
  },
  {
    path: "/archivos/choferes",
    name: "choferes",
    component: Choferes,
    meta: { opcion: 4 },
  },
  {
    path: "/archivos/vehiculos",
    name: "vehiculos",
    component: Vehiculos,
    meta: { opcion: 5 },
  },
  {
    path: "/vehiculos/kilometraje",
    name: "kilometraje",
    component: Kilometraje,
    meta: { opcion: 10 },
  },
  {
    path: "/vehiculos/partes",
    name: "partes",
    component: Partes,
    meta: { opcion: 11 },
  },
  {
    path: "/vehiculos/tareas",
    name: "tareas",
    component: Tareas,
    meta: { opcion: 12 },
  },
  {
    path: "/reportes/flota",
    name: "flota",
    component: Flota,
    meta: { opcion: 8 },
  },
  {
    path: "/preventivo/actividades",
    name: "preventivo",
    component: Preventivo,
    meta: { opcion: 14 },
  },
  {
    path: "/preventivo/agenda",
    name: "agenda",
    component: Agenda,
    meta: { opcion: 15 },
  },
  {
    path: "/correctivo/actividades",
    name: "correctivo",
    component: Correctivo,
    meta: { opcion: 17 },
  },
  {
    path: "/correctivo/agenda",
    name: "agenda",
    component: Agenda,
    meta: { opcion: 18 },
  },
  {
    path: "/reportes/garantiafecha",
    name: "garantiafecha",
    component: GarantiaFecha,
    meta: { opcion: 6 },
  },
  {
    path: "/usuarios/usuarios",
    name: "usuarios",
    component: Usuarios,
    meta: { opcion: 7 },
  },
  {
    path: "/usuarios/clave",
    name: "clave",
    component: Clave,
    meta: { opcion: 0 },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !router.app.$session.exists())
    next({ name: "login" });
  else {
    if (to.meta.opcion == 0) {
      next();
    } else {
      let opciones = router.app.$session.get("opciones");
      if (opciones.includes(to.meta.opcion)) {
        next();
      }
    }
  }
});

export default router;
