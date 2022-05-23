<script>
export default {
  computed: {
    currentMode() {
      return this.$store.getters.currentMode;
    },
    currentScene() {
      return this.$store.getters.currentScene;
    },
    listType() {
      if (this.$route.name !== "file") {
        return this.$route.name;
      } else {
        return this.$route.params.type.concat("s");
      }
    },
    baseList() {
      return this.$store.getters.thumbnails(this.listType);
    },
  },
  methods: {
    fileIndex(fileName) {
      return this.baseList.map((item) => item.name).indexOf(fileName);
    },
  },
};
</script>
