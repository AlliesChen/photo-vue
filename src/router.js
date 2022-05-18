import Vue from "vue";
import Router from "vue-router";
import PhotoList from "./components/PhotoList.vue";
import VideoList from "./components/VideoList.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
    },
    {
      path: "/images",
      name: "images",
      component: PhotoList,
    },
    {
      path: "/videos",
      name: "videos",
      component: VideoList,
    },
    {
      path: "/albums",
      name: "albums",
    },
  ],
});
