import axios from "axios";

const _axios = axios.create({
  baseURL: process.env.VUE_APP_RUTA_API,
});

export default _axios;
