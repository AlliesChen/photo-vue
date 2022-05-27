<template>
  <article class="w-full h-full flex-col items-center bg--black">
    <header class="text-white flex items-center">
      {{ `${baseList().length - currentIndex}/${baseList().length}` }}
      <!-- back to images or videos -->
      <router-link
        :to="`/${routeType}s`"
        class="absolute right-4 flex items-center text-white"
      >
        <feather type="x" />
      </router-link>
    </header>
    <Show-Case
      class="main"
      :routeType="routeType"
      :routeId="routeId"
      :currentIndex="currentIndex"
      :fileType="fileType"
    />
    <footer class="text-white flex items-center">{{ timestamp }}</footer>
  </article>
</template>

<script>
import ShowCase from "../../components/ShowCase.vue";
export default {
  name: "FilePage",
  components: {
    ShowCase,
  },
  data() {
    return {
      routeType: "",
      routeId: "",
      source: "",
    };
  },
  inject: ["baseList"],
  computed: {
    currentIndex() {
      return this.baseList()
        .map((item) => item.name)
        .indexOf(this.routeId);
    },
    fileType() {
      // Match and select the file extension (separate by the dot)
      return `${this.routeType}/${this.routeId.match(/\w+/g)[1]}`;
    },
    timestamp() {
      const timeFormat = this.routeId.match(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
      );
      return `${timeFormat[1]}/${timeFormat[2]}/${timeFormat[3]} ${timeFormat[4]}:${timeFormat[5]}:${timeFormat[6]}`;
    },
  },
  watch: {
    $route(newPath, oldPath) {
      if (Object.keys(newPath.params).length) {
        this.routeType = newPath.params.type;
        this.routeId = newPath.params.id;
      } else {
        this.routeType = oldPath.params.type;
        this.routeId = oldPath.params.id;
      }
    },
  },
  created() {
    this.routeType = this.$route.params.type;
    this.routeId = this.$route.params.id;
  },
  activated() {
    this.$store.commit("useScene", "showcase");
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
.main {
  /* header and footer are both 8 rem height */
  min-height: calc(100vh - 8rem);
}
.bg--black {
  background-color: var(--black);
}
.mask {
  z-index: 2;
}
</style>
