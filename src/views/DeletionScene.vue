<template>
  <section
    class="w-full h-full flex-col justify-flex-end items-center bg__balck--tl"
  >
    <DelectionBtn class="btn danger rounded-lg"
      >刪除{{ pageType }}</DelectionBtn
    >
    <button @click="useScene" class="btn primary rounded-lg">取消</button>
  </section>
</template>

<script>
import DelectionBtn from "../components/DeletionBtn.vue";
export default {
  components: {
    DelectionBtn,
  },
  computed: {
    pageType() {
      const currentPage = this.$store.getters.currentPage;
      switch (currentPage) {
        case "images":
          return "照片";
        case "videos":
          return "影片";
        default:
          return "相簿";
      }
    },
  },
  methods: {
    useScene() {
      this.$store.commit("useScene", "none");
    },
  },
};
</script>

<style scoped>
/* tl: translucent */
.bg__black--tl {
  background-color: rgba(0, 0, 0, 0.5);
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
