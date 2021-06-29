import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import VCalendar from "v-calendar";
import VueFinalModal from "vue-final-modal";
import axios from "axios";
//import VueEcho from "vue-echo-laravel";
//import 'expose?$!expose?jQuery!jquery'

// logout if unauthorized user
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // I should logout the client
      localStorage.removeItem("token");
      console.log("Token from axios : Bearer " + store.getters.getToken);
      store.commit("REMOVE_CLIENT_DATE");
      router.push("/home");
    }
    return error;
  }
);

axios.defaults.headers.common.crossDomain = true;



// var socketId = window.Echo.socketId();
// window.axios.defaults.headers.common["X-Socket-ID"] = socketId;

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// Use v-calendar & v-date-picker components

createApp(App)
  .use(VueFinalModal())
  .use(VCalendar, {})
  .use(store)
  .use(router)
  .mount("#app");
