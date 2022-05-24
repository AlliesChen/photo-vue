<template>
  <ol class="m-0 p-0">
    <li v-for="(item, index) in baseList" :key="item.name" class="relative">
      <router-link :to="fileRoot + '/' + item.name">
        <File-Case
          :source="thumbnailRoot + '/' + item.name"
          :alter="item.name"
          :type="item.type.match(/\w+/)[0]"
        />
      </router-link>
      <div
        v-show="currentMode === 'selection'"
        @click="setFile(index)"
        class="mask absolute w-full top-0"
      >
        <feather
          :type="item.isSelect ? 'check-circle' : 'circle'"
          class="absolute right-1 bottom-1 text-white"
        />
      </div>
    </li>
  </ol>
</template>

<script>
import CommonInfo from "./mixin/CommonInfo.vue";
import { baseURL } from "../store/files";
import FileCase from "./FileCase.vue";
export default {
  name: "FileGallery",
  mixins: [CommonInfo],
  components: {
    FileCase,
  },
  computed: {
    fileRoot() {
      if (this.$route.name === "file") {
        return this.$route.params.type;
      }
      return this.$route.name.slice(0, -1);
    },
    thumbnailRoot() {
      if (this.fileRoot === "image") {
        return `${baseURL}/${this.fileRoot}-xs`;
      } else {
        return `${baseURL}/${this.fileRoot}`;
      }
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
}
</style>
