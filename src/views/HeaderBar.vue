<template>
  <header class="sticky w-full justify-center items-center">
    <h2 class="text-white">{{ headerTitle }}</h2>
    <button
      @click="useMode('selection')"
      v-show="currentMode() === 'browse'"
      class="btn absolute rectangle rounded right-16"
    >
      選取
    </button>
    <button
      @click="resetStatus()"
      v-show="currentMode() === 'selection'"
      class="btn absolute rectangle rounded right-16"
    >
      取消
    </button>
    <Upload-Btn
      v-if="$route.params.type !== 'albums'"
      class="btn absolute right-4"
    />
    <button
      v-else
      @click="useScene('creation')"
      :disabled="currentScene() === 'creation'"
      class="btn absolute right-4 rounded-lg"
    >
      <feather type="folder-plus" />
    </button>
  </header>
</template>

<script>
import UploadBtn from "../components/UploadBtn.vue";
import { useStatusStore } from "@/store/status_cp";
export default {
  name: "HeaderBar",
  components: { UploadBtn },
  inject: ["currentMode", "currentScene", "baseList"],
  computed: {
    headerTitle() {
      const counter = this.baseList()?.length;
      switch (this.$route.params.type) {
        case "images":
          return `${counter}張相片`;
        case "videos":
          return `${counter}部影片`;
        case "albums":
          return `${counter}本相簿`;
        default:
          return "Sorry!";
      }
    },
  },
  methods: {
    useMode(mode) {
      this.status.useMode(mode);
    },
    useScene(scene) {
      this.status.useScene(scene);
    },
    resetStatus() {
      this.useScene("none");
      this.useMode("browse");
    },
  },
  created() {
    this.status = useStatusStore();
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
