<template>
  <ol class="m-0 p-0">
    <li
      v-for="(item, index) in videos"
      :key="item.name"
      @click="setFile(index)"
      class="relative"
    >
      <video controls>
        <source :src="item.src" :type="item.type" />
        Your browser does not support the video tag.
      </video>
      <div v-show="currentMode === 'selection'" class="mask absolute top-0">
        <feather
          :type="item.isSelect ? 'check-circle' : 'circle'"
          class="absolute"
          style="bottom: 0.25rem; right: 0.25rem; color: var(--white)"
        />
      </div>
    </li>
  </ol>
</template>

<script>
import CommonInfo from "./mixin/CommonInfo.vue";
export default {
  name: "VideoGallery",
  mixins: [CommonInfo],
  computed: {
    videos() {
      return this.$store.getters.vidThumbnails;
    },
  },
  methods: {
    setFile(index) {
      if (this.currentMode === "selection") {
        this.$store.commit("setSelected", ["videos", index]);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "../styles/main";
@include main.setTop(0);
ol {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  & > li {
    width: calc(100% / 3);
    height: calc(100vw / 3);
  }
}
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mask {
  width: 100%;
  height: calc(100vw / 3);
  // as same as --cyan-dark
  background-color: rgba(22, 78, 99, 0.7);
  pointer-events: none;
}
</style>
