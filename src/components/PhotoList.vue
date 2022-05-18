<template>
  <ol class="m-0 p-0">
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
};
</script>

<style scoped lang="scss">
ol {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  & > li {
    position: relative;
    width: calc(100% / 3);
    height: calc(100vw / 3);
    color: black;
  }
}
img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
