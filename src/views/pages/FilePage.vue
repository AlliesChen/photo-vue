<template>
  <article class="w-full h-full flex-col items-center bg--black">
    <header class="text-white flex items-center">
      {{ `${baseList().length - currentIndex}/${baseList().length}` }}
      <!-- back to the lists -->
      <router-link
        :to="`/${$route.params.type}`"
        class="absolute right-4 flex items-center text-white"
      >
        <feather type="x" />
      </router-link>
    </header>
    <Show-Case class="main" :currentIndex="currentIndex" :fileType="fileType" />
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
  inject: ["baseList"],
  computed: {
    currentIndex() {
      return this.baseList().findIndex(
        (item) => item.id === this.$route.params.id
      );
    },
    fileType() {
      const current = this.baseList()[this.currentIndex];
      return `${current.type}/${current.ext}`;
    },
    timestamp() {
      const timeFormat = this.$route.params.id.match(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
      );
      return `${timeFormat[1]}/${timeFormat[2]}/${timeFormat[3]} ${timeFormat[4]}:${timeFormat[5]}:${timeFormat[6]}`;
    },
  },
  mounted() {
    this.$store.commit("useScene", "showcase");
  },
  destroyed() {
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
.bg--black-tl {
  background-color: var(--black-tl);
}
</style>
