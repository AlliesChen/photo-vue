// For managing App status
export default {
  state: {
    pages: [
      {
        name: "images",
        isCurrent: false,
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
    ],
    scenes: [
      {
        name: "none",
        isCurrent: true,
      },
      {
        name: "deletion",
        isCurrent: false,
      },
    ],
  },
  getters: {
    currentPage: (state) => {
      return state.pages.find((page) => page.isCurrent === true)?.name;
    },
    currentMode: (state) => {
      return state.modes.find((mode) => mode.isCurrent === true).name;
    },
    currentScene: (state) => {
      return state.scenes.find((scene) => scene.isCurrent === true).name;
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
    useScene(state, target) {
      state.scenes.forEach((scene) => {
        if (scene.name === target) {
          scene.isCurrent = true;
        } else {
          scene.isCurrent = false;
        }
      });
    },
  },
};
