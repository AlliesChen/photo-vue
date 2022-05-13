import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pages: [
      {
        name: "photos",
        isCurrent: true,
      },
      {
        name: "videos",
        isCurrent: false,
      },
      {
        name: "albums",
        isCurrent: false,
      },
    ],
    modes: [
      {
        name: "browse",
        isCurrent: true,
      },
      {
        name: "selection",
        isCurrent: false,
      },
      {
        name: "deletion",
        isCurrent: false,
      },
      {
        name: "uploading",
        isCurrent: false,
      },
    ],
  },
  getters: {
    currentPage: (state) => {
      return state.pages.find((page) => page.isCurrent === true).name;
    },
    currentMode: (state) => {
      return state.modes.find((mode) => mode.isCurrent === true).name;
    },
  },
  mutations: {
    usePage(state, target) {
      state.pages.forEach((page) => {
        if (page.name === target) {
          page.isCurrent = true;
        } else {
          page.isCurrent = false;
        }
      });
    },
    useMode(state, target) {
      state.modes.forEach((mode) => {
        if (mode.name === target) {
          mode.isCurrent = true;
        } else {
          mode.isCurrent = false;
        }
      });
    },
  },
  actions: {},
  modules: {},
});
