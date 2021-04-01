import { BToast } from "bootstrap-vue";

export default function makeToast(mensaje, tipo) {
  let bootStrapToaster = new BToast();
  bootStrapToaster.$bvToast.toast(mensaje, {
    title: "Atención:",
    autoHideDelay: 5000,
    variant: tipo,
    solid: true,
  });
}
