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
  <!-- TODO: Custom controls -->
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
    // Note: below is passed by FileList
    lastItem: {
      type: Object,
      default() {
        return {
          name: null,
          type: null,
          isSelect: null,
          index: null,
        };
      },
    },
    observer: IntersectionObserver,
  },
  inject: ["baseList", "currentScene"],
  computed: {
    isShowcase() {
      return this.currentScene() === "showcase";
    },
  },
  mounted() {
    if (this.isShowcase) {
      return;
    }
    if (
      this.lastItem.name === this.fileName &&
      this.lastItem.index !== this.baseList().length - 1
    ) {
      this.observer.observe(this.$el);
    }
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
