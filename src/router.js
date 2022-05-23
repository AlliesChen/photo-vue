import Vue from "vue";
import Router from "vue-router";
import FileList from "./components/FileList.vue";
import FileScene from "./views/FileScene.vue";

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
      path: "/:type/:id",
      name: "file",
      component: FileScene,
    },
  ],
});
