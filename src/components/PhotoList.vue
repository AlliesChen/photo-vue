<template>
  <ol class="m-0 p-0">
    <li
      v-for="(item, index) in thumbnails"
      :key="item.name"
      @click="setFile(index)"
      class="relative"
    >
      <img :src="item.src" :alt="item.name" class="w-full h-full" />
      <div
        v-show="currentMode === 'selection'"
        class="mask absolute w-full top-0"
      >
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
  name: "PhotoGallery",
  mixins: [CommonInfo],
  computed: {
    thumbnails() {
      return this.$store.getters.thumbnails;
    },
  },
  methods: {
    setFile(index) {
      if (this.currentMode === "selection") {
        this.$store.commit("setSelected", ["images", index]);
      }
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
    width: calc(100% / 3);
    height: calc(100vw / 3);
  }
}
img {
  object-fit: cover;
}
.mask {
  height: calc(100vw / 3);
  // as same as --cyan-dark
  background-color: rgba(22, 78, 99, 0.7);
  pointer-events: none;
}
</style>
