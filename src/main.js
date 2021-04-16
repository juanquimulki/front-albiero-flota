import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

const options = {
  styles: ["./css/print.css"],
};
import VueHtmlToPaper from "vue-html-to-paper";
Vue.use(VueHtmlToPaper, options);

Vue.config.productionTip = false;

import VueSession from "vue-session";
Vue.use(VueSession);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
