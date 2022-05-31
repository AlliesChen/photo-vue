<template>
  <section
    class="w-full h-full flex-col justify-flex-end items-center bg--black-tl"
  >
    <button @click="deleteFiles" class="btn danger rounded-lg">
      刪除{{ pageType }}
    </button>
    <button @click="useScene" class="btn primary rounded-lg">取消</button>
  </section>
</template>

<script>
export default {
  inject: ["baseList"],
  computed: {
    pageType() {
      switch (this.$route.params.type) {
        case "images":
          return "照片";
        case "videos":
          return "影片";
        case "albums":
          return "相簿";
        default:
          return "檔案?";
      }
    },
  },
  methods: {
    deleteFiles() {
      const list = this.baseList().reduce(
        (prev, current) =>
          current.isSelect ? prev.concat(current.name) : prev,
        []
      );
      this.$store.dispatch("deleteFiles", list).then(() => {
        // close the scene
        this.$store.commit("useScene", "none");
        // end the selection mode
        this.$store.commit("useMode", "browse");
      });
    },
    useScene() {
      this.$store.commit("useScene", "none");
    },
  },
};
</script>

<style scoped>
/* translucent */
.bg--black-tl {
  background-color: var(--black-tl);
}
.btn {
  background-color: var(--white);
  width: 75%;
  height: 3rem;
  margin-bottom: 1rem;
}
.btn.primary {
  color: var(--cyan);
}
.btn.danger {
  color: var(--pink);
}
</style>
