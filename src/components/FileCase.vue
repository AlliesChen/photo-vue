<template>
  <img
    v-if="type === 'image'"
    :src="source || fileOrigin"
    :alt="alter"
    class="w-full h-full"
  />
  <video v-else :controls="isShowcase" class="w-full h-full">
    <source :src="source || fileOrigin" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script>
import { baseURL } from "../store/files";
export default {
  props: {
    type: String,
    source: String,
    alter: String,
  },
  computed: {
    isShowcase() {
      return this.$store.getters.currentScene === "showcase";
    },
    fileOrigin() {
      console.log("update");
      return `${baseURL}/${this.type}/${this.alter}`;
    },
  },
};
</script>

<style></style>
