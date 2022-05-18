<template>
  <ol class="m-0 p-0 flex">
    <li v-for="item in videos" :key="item.uuid">
      <video>
        <source :src="item.src" :type="item.type" />
        Sorry, the video cannot be played.
      </video>
    </li>
  </ol>
</template>

<script>
export default {
  name: "VideoGallery",
  computed: {
    videos() {
      return this.$store.getters.vidThumbnails.map((item) =>
        Object.assign(item, { uuid: this.$uuid.v1() })
      );
    },
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
video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
