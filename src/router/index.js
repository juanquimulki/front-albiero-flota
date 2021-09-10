import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import Choferes from "../views/archivos/Choferes";
import Vehiculos from "../views/archivos/Vehiculos";
import Proveedores from "../views/archivos/Proveedores";
import Repuestos from "../views/archivos/Repuestos";
import Kilometraje from "../views/vehiculos/Kilometraje";
import Partes from "../views/vehiculos/Partes";
import Tareas from "../views/vehiculos/Tareas";
import Preventivo from "../views/mantenimiento/Preventivo";
import Correctivo from "../views/mantenimiento/Correctivo";
import Agenda from "../views/mantenimiento/Agenda";
import General from "../views/mantenimiento/General";
import MasDatos from "../views/mantenimiento/MasDatos";
import Flota from "../views/reportes/Flota";
import Garantia from "../views/reportes/Garantia";
import Historial from "../views/reportes/Historial";
import Gastos from "../views/reportes/Gastos";
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
    name: "vehiculosArchivos",
    component: Vehiculos,
    meta: { opcion: 5 },
  },
  {
    path: "/archivos/proveedores",
    name: "proveedores",
    component: Proveedores,
    meta: { opcion: 21 },
  },
  {
    path: "/archivos/repuestos",
    name: "repuestos",
    component: Repuestos,
    meta: { opcion: 22 },
  },
  {
    path: "/archivos/vehiculos",
    name: "vehiculosVehiculos",
    component: Vehiculos,
    meta: { opcion: 19 },
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
    path: "/preventivo/actividades",
    name: "preventivo",
    component: Preventivo,
    meta: { opcion: 14 },
  },
  {
    path: "/preventivo/agenda",
    name: "agendaPreventivo",
    component: Agenda,
    meta: { opcion: 15 },
  },
  {
    path: "/preventivo/masdatos",
    name: "masDatosPreventivo",
    component: MasDatos,
    meta: { opcion: 23 },
  },
  {
    path: "/correctivo/actividades",
    name: "correctivo",
    component: Correctivo,
    meta: { opcion: 17 },
  },
  {
    path: "/correctivo/agenda",
    name: "agendaCorrectivo",
    component: Agenda,
    meta: { opcion: 18 },
  },
  {
    path: "/correctivo/masdatos",
    name: "masDatosCorrectivo",
    component: MasDatos,
    meta: { opcion: 24 },
  },
  {
    path: "/general/actividades",
    name: "general",
    component: General,
    meta: { opcion: 27 },
  },
  {
    path: "/reportes/flota",
    name: "flota",
    component: Flota,
    meta: { opcion: 8 },
  },
  {
    path: "/reportes/garantia",
    name: "garantia",
    component: Garantia,
    meta: { opcion: 6 },
  },
  {
    path: "/reportes/historial",
    name: "historial",
    component: Historial,
    meta: { opcion: 20 },
  },
  {
    path: "/reportes/gastos",
    name: "gastos",
    component: Gastos,
    meta: { opcion: 25 },
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
