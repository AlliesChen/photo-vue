import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pages: [
      {
        name: "images",
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
    // Base on backend api address
    // images name list
    images: [],
    // thumbnails
    "image-xs": [],
    // origin
    image: [],
    // videos name list
    videos: [],
    video: [],
    // albums name list
    albums: [],
  },
  getters: {
    currentPage: (state) => {
      return state.pages.find((page) => page.isCurrent === true).name;
    },
    currentMode: (state) => {
      return state.modes.find((mode) => mode.isCurrent === true).name;
    },
    thumbnails: (state) => {
      return state.images.map((image) => ({
        src: `http://127.0.0.1:8080/image-xs/${image}`,
        name: image,
      }));
    },
    vidThumbnails: (state) => {
      return state.videos.map((video) => {
        const fileExt = video.match(/(?:\.)(\w+)$/)[0];
        return {
          src: `http://127.0.0.1:8080/video/${video}`,
          type: `video/${fileExt}`,
          name: video,
        };
      });
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
    listFiles(state, [type, items]) {
      state[type].unshift(...items);
    },
  },
  actions: {
    getFileNames: async function (context, address) {
      // this.axios.defaults.baseURL = "http://127.0.0.1:8080";
      try {
        const response = await axios({
          url: `/${address}`,
          baseURL: "http://127.0.0.1:8080",
        });
        const data = response.data ?? [];
        context.commit("listFiles", [address, data]);
      } catch (err) {
        throw new Error(err);
      }
    },
    uploadFiles: async function (context, files) {
      const formData = new FormData();
      let images = [];
      let videos = [];
      for (let i = 0; i < files.length; i += 1) {
        formData.append("files", files[i]);
      }
      try {
        const response = await axios({
          method: "post",
          url: "/upload",
          data: formData,
          baseURL: "http://127.0.0.1:8080",
        });
        const { data } = response;
        data.forEach((file) => {
          if (file.match(/(?:\.)(png|jpe?g)$/)) {
            images.push(file);
          } else {
            videos.push(file);
          }
        });
        if (images.length > 0) {
          context.commit("listFiles", ["images", images]);
        }
        if (videos.length > 0) {
          context.commit("listFiles", ["videos", videos]);
        }
      } catch (err) {
        throw new Error("upload fail", err);
      }
    },
  },
  modules: {},
});
