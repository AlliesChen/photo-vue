import Vue from "vue";
import App from "./App.vue";
import UUID from "vue-uuid";
import VueFeather from "vue-feather";
import store from "./store";
import router from "./router";

Vue.use(UUID);
Vue.use(VueFeather);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
