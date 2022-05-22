<template>
  <main class="main w-full relative">
    <keep-alive :max="1">
      <router-view />
    </keep-alive>
    <Deletion-Scene
      v-if="currentScene === 'deletion'"
      class="mask fixed top-0"
    />
  </main>
</template>

<script>
import DeletionScene from "./DeletionScene.vue";
export default {
  name: "FilePages",
  components: {
    DeletionScene,
  },
  computed: {
    currentScene() {
      return this.$store.getters.currentScene;
    },
  },
};
</script>

<style scoped>
.main {
  /* header and footer are both 8 rem height */
  min-height: calc(100vh - 8rem);
}
.mask {
  z-index: 2;
}
</style>
