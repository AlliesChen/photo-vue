import Vue from "vue";
import Router from "vue-router";
import FileList from "./components/FileList.vue";
import AlbumPage from "./views/pages/AlbumPage.vue";
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
      path: "/:type(images|videos)",
      name: "files",
      component: FileList,
    },
    {
      path: "/:type(albums)",
      name: "albums",
      component: AlbumPage,
    },
    {
      path: "/:type(albums)/:id(\\d+)",
      name: "album",
      component: FileList,
    },
    {
      path: "/:type(images|videos)/:id(\\d+\\.\\w+)",
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
