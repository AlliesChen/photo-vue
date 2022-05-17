<template>
  <ol class="m-0 p-0 flex">
    <li v-for="item in thumbnails" :key="item.uuid">
      <img :src="item.src" :alt="item.name" />
    </li>
  </ol>
</template>

<script>
export default {
  name: "PhotoGallery",
  computed: {
    thumbnails() {
      return this.$store.getters.thumbnails.map((item) =>
        Object.assign(item, { uuid: this.$uuid.v1() })
      );
    },
  },
  mounted() {
    this.$store.dispatch("getFileNames", "images");
  },
};
</script>

<style scoped lang="scss">
ol {
  flex-wrap: wrap;
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
