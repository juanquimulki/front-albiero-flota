import { BToast } from "bootstrap-vue";

export default function msgBoxConfirm(titulo, cuerpo) {
  return new Promise(function (resolve) {
    let bootStrapToaster = new BToast();
    bootStrapToaster.$bvModal
      .msgBoxConfirm(cuerpo, {
        title: titulo,
        size: "md",
        buttonSize: "md",
        okVariant: "danger",
        okTitle: "SÍ",
        cancelTitle: "NO",
        footerClass: "p-2",
        hideHeaderClose: false,
        centered: true,
      })
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        // An error occurred
        console.log(err);
      });
  });
}
