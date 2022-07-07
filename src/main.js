import Vue from "vue";
import App from "./App.vue";
import UUID from "vue-uuid";
import VueFeather from "vue-feather";
import store from "./store";
import { createPinia, PiniaVuePlugin } from "pinia";
import router from "./router";

Vue.use(UUID);
Vue.use(VueFeather);
Vue.use(PiniaVuePlugin);
Vue.config.productionTip = false;

const pinia = createPinia();

new Vue({
  store,
  pinia,
  router,
  render: (h) => h(App),
}).$mount("#app");
