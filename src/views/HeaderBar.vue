<template>
  <header class="header justify-center items-center">
    <h2 class="text-white">0張相片</h2>
    <button
      v-for="btn in btns"
      :key="btn.name"
      :class="[
        currentMode === btn.mode ? 'btn rectangle rounded right-16' : 'none',
      ]"
      :data-to="btn.to"
      @click="useMutation"
    >
      {{ btn.text }}
    </button>
    <Upload-Btn class="btn right-4" />
  </header>
</template>

<script>
import FunctionMixin from "./FunctionMixin.vue";
import UploadBtn from "../components/UploadBtn.vue";
export default {
  name: "HeaderBar",
  mixins: [FunctionMixin],
  components: { UploadBtn },
  data() {
    return Object.freeze({
      btns: [
        {
          name: "picker",
          text: "選取",
          mode: "browse",
          to: "mode-selection",
        },
        {
          name: "anti-picker",
          text: "取消",
          mode: "selection",
          to: "mode-browse",
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
    getFileNames: async function (items) {
      // this.axios.defaults.baseURL = "http://127.0.0.1:8080";
      try {
        const response = await this.axios({
          url: `/${items}`,
          baseURL: "http://127.0.0.1:8080",
        });
        const data = response.data;
        // in case no file exists
        if (!data) {
          return [];
        }
        const fileNames = data.map((item) => item.slice(0));
        return fileNames;
      } catch (err) {
        throw new Error(err);
      }
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
