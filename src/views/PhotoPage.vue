<template>
  <main class="main flex w-full">
    <Photo-List />
    <Video-List />
  </main>
</template>

<script>
import PhotoList from "../components/PhotoList.vue";
import VideoList from "../components/VideoList.vue";
export default {
  components: { PhotoList, VideoList },
};
</script>

<style scoped>
.main {
  /* header and footer are both 8 rem height */
  min-height: calc(100vh - 8rem);
  align-content: flex-start;
  flex-wrap: wrap;
}
</style>
