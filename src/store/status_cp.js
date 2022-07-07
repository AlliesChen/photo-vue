import { defineStore } from "pinia";

// For managing App status
export const useStatusStore = defineStore("status", {
  state: () => {
    return {
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
        {
          name: "creation",
          isCurrent: false,
        },
      ],
    };
  },
  getters: {
    currentMode: (state) => {
      return state.modes.find((mode) => mode.isCurrent === true).name;
    },
    currentScene: (state) => {
      return state.scenes.find((scene) => scene.isCurrent === true).name;
    },
  },
  actions: {
    useMode(target) {
      this.modes.forEach((mode) => {
        if (mode.name === target) {
          mode.isCurrent = true;
        } else {
          mode.isCurrent = false;
        }
      });
    },
    useScene(target) {
      this.scenes.forEach((scene) => {
        if (scene.name === target) {
          scene.isCurrent = true;
        } else {
          scene.isCurrent = false;
        }
      });
    },
  },
});
