<template>
  <ol class="m-0 p-0" @click="clickEvent">
    <li v-for="item in thumbnails" :key="item.uuid" class="relative">
      <img :src="item.src" :alt="item.name" />
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
export default {
  name: "PhotoGallery",
  data() {
    return {
      isSelect: [],
    };
  },
  computed: {
    thumbnails() {
      return this.$store.getters.thumbnails.map((item) =>
        Object.assign(item, { uuid: this.$uuid.v1(), isSelect: false })
      );
    },
    currentMode() {
      return this.$store.getters.currentMode;
    },
  },
  methods: {
    clickEvent(e) {
      console.log(e.target);
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
img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.mask {
  width: 100%;
  height: calc(100vw / 3);
  // as same as --cyan-dark
  background-color: rgba(22, 78, 99, 0.7);
  pointer-events: none;
}
</style>
