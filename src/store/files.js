import axios from "axios";
const baseURL = "http://127.0.0.1:8080";
axios.defaults.baseURL = baseURL;
export { baseURL };
export default {
  state: {
    // Base on backend api address
    // images name list
    images: [],
    // videos name list
    videos: [],
    // albums name list
    albums: [],
  },
  getters: {
    checkState: (state) => (type) =>
      Object.prototype.hasOwnProperty.call(state, type) ? state[type] : [],
    checkItem: (state) => (type, index) => state[type][index],
    checkIndex: (state) => (type, id) =>
      state[type].findIndex((item) => item.id === id),
  },
  mutations: {
    listFiles(state, [type, items, isFromName = false]) {
      let objs;
      if (type === "images") {
        objs = items.map((item) => ({
          id: item,
          list: "images",
          isSelect: false,
          type: "image",
          // NOTE: jpeg, png etc.
          ext: `${item.match(/\w+/g)[1]}`,
          origin: `${baseURL}/image/${item}`,
          small: `${baseURL}/image-xs/${item}`,
        }));
      } else {
        objs = items.map((item) => ({
          id: item,
          list: "videos",
          isSelect: false,
          type: "video",
          // NOTE: mp4
          ext: `${item.match(/\w+/g)[1]}`,
          origin: `${baseURL}/video/${item}`,
        }));
      }
      if (isFromName) {
        state[type].push(...objs);
      } else {
        state[type].unshift(...objs);
      }
    },
    listAlbums(state, albums) {
      for (const album of albums) {
        const obj = Object.assign(album, { isSelect: false });
        const index = state.albums.findIndex((album) => album.id === obj.id);
        if (index < 0) {
          state.albums.push(obj);
        } else {
          state.albums[index].photoList.unshift(...obj.photoList);
        }
      }
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
    getFileNames: async function (context, [address, fromName]) {
      try {
        const response = await axios({
          method: "get",
          url: `/${address}`,
          params: { fromName },
        });
        const data = response.data ?? [];
        const isFromName = !!fromName;
        context.commit("listFiles", [address, data, isFromName]);
      } catch (err) {
        throw new Error(err);
      }
    },
    getAlbumNames: async function (context) {
      try {
        const response = await axios({
          method: "get",
          url: `/albums`,
        });
        const data = response.data;
        context.commit("listAlbums", data);
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
    deleteItems: async function (context, files) {
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
        throw new Error("deleting files failed", err);
      }
    },
    deleteAlbums: async function (context, albums) {
      for (const album of albums) {
        try {
          const response = await axios({
            method: "delete",
            url: `/album/${album}`,
          });
          const { data } = response;
          const index = context.getters.checkIndex("albums", data.toString());
          context.commit("deleteFile", ["albums", index]);
        } catch (err) {
          throw new Error("deleting albums failed", err);
        }
      }
    },
    createAlbum: async function (context, album) {
      try {
        const response = await axios({
          method: "post",
          url: "/album",
          headers: {
            "Content-Type": "text/plain",
          },
          data: JSON.stringify(album),
        });
        const { data } = response;
        context.commit("listAlbums", new Array(data));
      } catch (err) {
        throw new Error("Fail to create a new album", err);
      }
    },
    addItems: async function (context, [id, items]) {
      try {
        const response = await axios({
          method: "put",
          url: `album/addphoto/${id}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(items),
        });
        const { data } = response;
        context.commit("listAlbums", new Array(data));
      } catch (err) {
        throw new Error("Fail to add items to the album", err);
      }
    },
  },
};
