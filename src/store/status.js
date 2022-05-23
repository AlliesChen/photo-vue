// For managing App status
export default {
  state: {
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
      {
        name: "showcase",
        isCurrent: false,
      },
    ],
  },
  getters: {
    currentMode: (state) => {
      return state.modes.find((mode) => mode.isCurrent === true).name;
    },
    currentScene: (state) => {
      return state.scenes.find((scene) => scene.isCurrent === true).name;
    },
  },
  mutations: {
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
