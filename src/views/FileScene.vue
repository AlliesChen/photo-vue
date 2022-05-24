<template>
  <article class="w-full h-full flex-col items-center bg__black">
    <header class="text-white flex items-center">
      {{ fileSeq }}
      <!-- back to images or videos -->
      <router-link
        :to="'/' + fileFrom"
        class="absolute right-4 flex items-center text-white"
      >
        <feather type="x" />
      </router-link>
    </header>
    <main class="flex justify-center items-center">
      <File-Case
        :type="$route.params.type"
        :alter="$route.params.id"
        class="current"
      />
    </main>
    <footer class="text-white flex items-center">{{ timestamp }}</footer>
  </article>
</template>

<script>
import CommonInfo from "../components/mixin/CommonInfo.vue";
import FileCase from "../components/FileCase.vue";
export default {
  name: "FileScene",
  mixins: [CommonInfo],
  components: {
    FileCase,
  },
  data() {
    return {
      fileSeq: "",
      timestamp: "",
      fileFrom: "",
    };
  },
  methods: {
    initScene() {
      if (this.currentScene !== "showcase") return;
      const file = this.$route.params.id;
      const type = this.$route.params.type.concat("s");
      const total = this.baseList.length;
      const current = this.$store.getters.checkIndex(type, file) + 1;
      const timestamp = file.match(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
      );
      this.fileSeq = `${current}/${total}`;
      // yyyy/mm/dd hh:mm:ss
      this.timestamp = `${timestamp[1]}/${timestamp[2]}/${timestamp[3]} ${timestamp[4]}:${timestamp[5]}:${timestamp[6]}`;
      this.fileFrom = type;
    },
  },
  activated() {
    this.$store.commit("useScene", "showcase");
    this.initScene();
  },
  deactivated() {
    this.$store.commit("useScene", "none");
  },
};
</script>

<style scoped lang="scss">
header,
footer {
  height: 4rem;
}
main {
  /* header and footer are both 8 rem height */
  min-height: calc(100vh - 8rem);
  & .current {
    width: min(90%, 90vh);
    height: min(90%, 90vw);
  }
}
.bg__black {
  background-color: var(--black);
}
.mask {
  z-index: 2;
}
</style>
