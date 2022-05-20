<template>
  <main class="main w-full relative">
    <router-view />
    <Deletion-Scene
      v-if="currentScene === 'deletion'"
      class="mask fixed top-0"
    />
  </main>
</template>

<script>
import DeletionScene from "./DeletionScene.vue";
export default {
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
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
