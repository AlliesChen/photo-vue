<script>
export default {
  computed: {
    currentMode() {
      return this.$store.getters.currentMode;
    },
    currentScene() {
      return this.$store.getters.currentScene;
    },
    baseList() {
      if (this.$route.name === "file") {
        return this.$store.getters.checkState(
          this.$route.params.type.concat("s")
        );
      } else {
        return this.$store.getters.checkState(this.$route.name);
      }
    },
  },
};
</script>
