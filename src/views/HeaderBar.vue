<template>
  <header class="sticky w-full justify-center items-center">
    <h2 class="text-white">{{ this.headerTitle }}</h2>
    <button
      v-for="btn in btns"
      @click="useMode(btn.to)"
      :key="btn.uuid"
      :class="
        currentMode === btn.mode
          ? 'btn absolute rectangle rounded right-16'
          : 'none'
      "
    >
      {{ btn.text }}
    </button>
    <Upload-Btn class="btn absolute right-4" />
  </header>
</template>

<script>
import CommonInfo from "../components/mixin/CommonInfo.vue";
import UploadBtn from "../components/UploadBtn.vue";
export default {
  name: "HeaderBar",
  mixins: [CommonInfo],
  components: { UploadBtn },
  data() {
    return Object.freeze({
      btns: [
        {
          uuid: this.$uuid.v1(),
          text: "選取",
          mode: "browse",
          to: "selection",
        },
        {
          uuid: this.$uuid.v1(),
          text: "取消",
          mode: "selection",
          to: "browse",
        },
      ],
    });
  },
  computed: {
    headerTitle() {
      const counter = this.baseList.length;
      switch (this.currentPage) {
        case "images":
          return `${counter}張相片`;
        case "videos":
          return `${counter}部影片`;
        default:
          return `${counter}個檔案`;
      }
    },
  },
  methods: {
    useMode(mode) {
      this.$store.commit("useMode", mode);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  z-index: 2;
  top: 0;
  height: 4rem;
  display: flex;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(74, 74, 74, 1) 25%,
    rgba(255, 255, 255, 0.65) 100%
  );
}

.btn {
  font-size: 1rem;
  color: var(--white);
  background-color: gray;
}

.rectangle {
  padding: 0.25rem 0.5rem;
}
</style>
