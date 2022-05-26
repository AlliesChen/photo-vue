<template>
  <img
    v-if="fileType.includes('image')"
    :src="source"
    :alt="fileName"
    :class="[
      isShowcase ? 'object--contain' : 'object--cover',
      'h-full',
      'w-full',
    ]"
  />
  <video
    v-else
    :controls="isShowcase"
    :src="source"
    :class="[
      isShowcase ? 'object--contain' : 'object--cover',
      'h-full',
      'w-full',
    ]"
  >
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
.object--contain {
  object-fit: contain;
}
.object--cover {
  object-fit: cover;
}
</style>
