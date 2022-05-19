<script>
export default {
  computed: {
    currentPage() {
      return this.$store.getters.currentPage;
    },
    currentMode() {
      return this.$store.getters.currentMode;
    },
    baseList() {
      switch (this.currentPage) {
        case "images":
          return this.$store.getters.thumbnails;
        case "videos":
          return this.$store.getters.vidThumbnails;
        default:
          return [];
      }
    },
  },
};
</script>
