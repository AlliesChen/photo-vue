import Vue from "vue";
import Vuex from "vuex";
import status from "./status";
import files from "./files";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    status,
    files,
  },
});
