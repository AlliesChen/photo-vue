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
      let stateName;
      if (this.$route.name === "file") {
        stateName = this.$route.params.type.concat("s");
      } else {
        stateName = this.$route.name;
      }
      return this.$store.getters.checkState(stateName);
    },
  },
};
</script>
