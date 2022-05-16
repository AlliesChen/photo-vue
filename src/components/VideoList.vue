<template>
  <ol class="m-0 p-0 flex">
    <li v-for="list in lists" :key="list.name">
      <img :src="list.src" :alt="list.name" />
    </li>
  </ol>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
    };
  },
  mounted() {
    this.$store.dispatch("getFileNames", "videos");
  },
};
</script>

<style scoped lang="scss">
ol {
  list-style-type: none;
  & > li {
    position: relative;
    width: calc(100vw / 3);
    height: calc(100vw / 3);
    color: black;
  }
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
