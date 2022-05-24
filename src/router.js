import Vue from "vue";
import Router from "vue-router";
import FileList from "./components/FileList.vue";
import FileScene from "./views/FileScene.vue";
import NotFoundPage from "./views/NotFoundPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
    },
    {
      path: "/images",
      name: "images",
      component: FileList,
    },
    {
      path: "/videos",
      name: "videos",
      component: FileList,
    },
    {
      path: "/albums",
      name: "albums",
    },
    {
      // to origin file
      // NOTE: path validation, e.g. image/12345.jpeg
      path: "/:type(image|video|album)/:id(\\d+\\.\\w+)",
      name: "file",
      component: FileScene,
    },
    {
      path: "*",
      name: "404",
      component: NotFoundPage,
    },
  ],
});
