import _axios from "../common/apiClient";
import makeToast from "../common/toast";

export default {
  name: "Data",
  data() {
    return {
      //authorization: this.$session.get("token"),
    };
  },
  methods: {
    getData(endpoint, payload) {
      let self = this;
      return new Promise(function (resolve) {
        _axios
          .get(endpoint, {
            params: payload,
            //headers: { Authorization: self.authorization },
          })
          .then((response) => {
            resolve(response.data.rows);
          })
          .catch((err) => {
            self.apiErrors(err.response.data);
          });
      });
    },
    postData(endpoint, payload) {
      let self = this;
      return new Promise(function (resolve) {
        _axios
          .post(endpoint, payload, {
            //headers: { Authorization: self.authorization },
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            self.apiErrors(err.response.data);
          });
      });
    },
    patchData(endpoint, payload) {
      let self = this;
      return new Promise(function (resolve) {
        _axios
          .patch(endpoint, payload, {
            //headers: { Authorization: self.authorization },
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            self.apiErrors(err.response.data);
          });
      });
    },
    deleteData(endpoint, payload) {
      let self = this;
      return new Promise(function (resolve) {
        _axios
          .delete(endpoint, {
            data: payload,
            //headers: { Authorization: self.authorization },
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            self.apiErrors(err.response.data);
          });
      });
    },

    apiErrors(err) {
      console.log(JSON.stringify(err));
      switch (err.status) {
        case 500:
          switch (err.code) {
            case 1451:
              makeToast(
                "No puede eliminar un registro 'principal' en uso, porque violaría la integridad de la base de datos.",
                "danger"
              );
              break;
            default:
              makeToast(err.message + ": " + err.description, "danger");
          }
          break;
        case 401:
          switch (err.code) {
            case 1:
              makeToast(
                "Su sesión ha expirado. Por favor, inicie nuevamente.",
                "danger"
              );
              this.$session.destroy();
              this.$router.push("/");
              break;
            default:
              makeToast(err.description, "danger");
          }
          break;
        default:
          makeToast(err.description, "danger");
      }
    },
  },
};
