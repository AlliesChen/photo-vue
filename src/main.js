import Vue from "vue";
import App from "./App.vue";
import UUID from "vue-uuid";
import VueFeather from "vue-feather";
import store from "./store";

Vue.use(UUID);
Vue.use(VueFeather);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
