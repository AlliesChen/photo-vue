<template>
  <img
    v-if="fileType === 'image'"
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
  data() {
    return {
      fileType: "",
      fileOrigin: "",
    };
  },
  computed: {
    isShowcase() {
      return this.$store.getters.currentScene === "showcase";
    },
  },
  methods: {
    initCase() {
      this.fileType = this.type.match(/\w+/)[0];
      this.fileOrigin = baseURL + this.$route.path;
    },
  },
  created() {
    this.initCase();
  },
};
</script>

<style></style>
