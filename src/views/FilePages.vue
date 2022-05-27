<template>
  <main class="w-full relative">
    <router-view :class="$route.name === 'file' && 'mask fixed top-0'" />
    <Deletion-Scene
      v-if="currentScene() === 'deletion'"
      class="mask fixed top-0"
    />
  </main>
</template>

<script>
import DeletionScene from "../components/DeletionScene.vue";
export default {
  name: "FilePages",
  components: {
    DeletionScene,
  },
  inject: ["currentScene"],
};
</script>

<style scoped>
main {
  /* header and footer are both 8 rem height */
  min-height: calc(100vh - 8rem);
}
.mask {
  z-index: 2;
}
</style>
