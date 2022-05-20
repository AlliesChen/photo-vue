import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "http://127.0.0.1:8080";

export default new Vuex.Store({
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
    // videos name list
    videos: [],
    // albums name list
    albums: [],
  },
  getters: {
    checkItem: (state) => (type, index) => state[type][index],
    checkIndex: (state) => (type, name) =>
      state[type].map((item) => item.name).indexOf(name),
    currentPage: (state) => {
      return state.pages.find((page) => page.isCurrent === true)?.name;
    },
    currentMode: (state) => {
      return state.modes.find((mode) => mode.isCurrent === true).name;
    },
    thumbnails: (state) => {
      return state.images.map((image) => ({
        ...image,
        src: `http://127.0.0.1:8080/image-xs/${image.name}`,
      }));
    },
    vidThumbnails: (state) => {
      return state.videos.map((video) => {
        const fileExt = video.name.match(/(?:\.)(\w+)$/)[1];
        return {
          src: `http://127.0.0.1:8080/video/${video.name}`,
          type: `video/${fileExt}`,
          name,
        };
      });
    },
    imageQty: (state) => {
      return state.images.length;
    },
    videoQty: (state) => {
      return state.videos.length;
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
      const files = items.map((item) => ({ name: item, isSelect: false }));
      state[type].unshift(...files);
    },
    setSelected(state, [type, index]) {
      const currentStatus = this.getters.checkItem(type, index).isSelect;
      state[type][index].isSelect = !currentStatus;
    },
    deleteFile(state, [type, index]) {
      state[type].splice(index, 1);
    },
  },
  actions: {
    getFileNames: async function (context, address) {
      try {
        const response = await axios({
          url: `/${address}`,
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
      const isImage = new RegExp(/(?:.)(png|jpe?g)$/);
      for (let i = 0; i < files.length; i += 1) {
        formData.append("files", files[i]);
      }
      try {
        const response = await axios({
          method: "post",
          url: "/upload",
          data: formData,
        });
        const { data } = response;
        const { successResults, errorFiles } = data;
        successResults.forEach((file) => {
          if (isImage.test(file)) {
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
        if (errorFiles.length) {
          console.log("Upload fails: ", errorFiles);
        }
      } catch (err) {
        throw new Error("Something wrong in the process of uploading", err);
      }
    },
    deleteFiles: async function (context, files) {
      const isImage = new RegExp(/(?:.)(png|jpe?g)$/);
      try {
        const response = await axios({
          method: "delete",
          url: "/delete",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(files),
        });
        const { data } = response;
        for (const [key, value] of Object.entries(data)) {
          if (value) {
            const type = isImage.test(key) ? "images" : "videos";
            const index = context.getters.checkIndex(type, key);
            context.commit("deleteFile", [type, index]);
          }
        }
      } catch (err) {
        throw new Error("deletion fail", err);
      }
    },
  },
  modules: {},
});
