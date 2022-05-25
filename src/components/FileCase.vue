<template>
  <img
    v-if="fileType.includes('image')"
    :src="source"
    :alt="fileName"
    class="content"
  />
  <video v-else :controls="isShowcase" :src="source" class="content">
    <source :type="fileType" />
    Your browser does not support the video tag.
  </video>
</template>

<script>
export default {
  props: {
    fileType: {
      required: true,
      type: String,
    },
    source: {
      required: true,
      type: String,
    },
    fileName: {
      required: true,
      type: String,
    },
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
