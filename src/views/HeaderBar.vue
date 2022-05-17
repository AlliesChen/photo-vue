<template>
  <header class="header justify-center items-center">
    <h2 class="text-white">0張相片</h2>
    <button
      v-for="btn in btns"
      @click.capture="useMode(btn.to)"
      :key="btn.uuid"
      :class="[
        currentMode === btn.mode ? 'btn rectangle rounded right-16' : 'none',
      ]"
    >
      {{ btn.text }}
    </button>
    <Upload-Btn class="btn right-4" />
  </header>
</template>

<script>
import UploadBtn from "../components/UploadBtn.vue";
export default {
  name: "HeaderBar",
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
    currentMode() {
      return this.$store.getters.currentMode;
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
@use "../styles/main";
@include main.setRight(4, 16);

.header {
  position: sticky;
  z-index: 2;
  top: 0;
  width: 100%;
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
  position: absolute;
  color: white;
  background-color: gray;
}

.rectangle {
  padding: 0.25rem 0.5rem;
}
</style>
