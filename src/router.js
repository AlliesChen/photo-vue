import Vue from "vue";
import Router from "vue-router";
import FileList from "./components/FileList.vue";
import AlbumList from "./components/AlbumList.vue";
import FilePage from "./views/pages/FilePage.vue";
import NotFoundPage from "./views/pages/NotFoundPage.vue";

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
      component: AlbumList,
    },
    {
      // to origin file
      // NOTE: path validation, e.g. image/12345.jpeg
      path: "/:type(image|video|album)/:id(\\d+\\.\\w+)",
      name: "file",
      component: FilePage,
    },
    {
      path: "*",
      name: "404",
      component: NotFoundPage,
    },
  ],
});
