import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

// Hmmm ?
const token = localStorage.getItem("access_token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
