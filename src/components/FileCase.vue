<template>
  <img v-if="type === 'image'" :src="source" :alt="alter" class="content" />
  <video v-else :controls="isShowcase" class="content">
    <source :src="source" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</template>

<script>
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
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
</style>
