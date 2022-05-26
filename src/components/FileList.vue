<template>
  <ol class="m-0 p-0">
    <li v-for="(item, index) in baseList" :key="item.name" class="relative">
      <router-link :to="fileRoot + '/' + item.name">
        <File-Case
          :source="thumbnailRoot + '/' + item.name"
          :fileName="item.name"
          :fileType="item.type"
        />
      </router-link>
      <div
        v-if="showDate(index)"
        class="_icon absolute flex justify-center items-center"
      >
        {{ getDate(item.name) }}
      </div>
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
    getDate(fileName) {
      const timestamp = fileName.match(/(\d{4})(\d{2})(\d{2})/);
      return `${timestamp[1]}/${timestamp[2]}/${timestamp[3]}`;
    },
    showDate(currentIdx) {
      if (currentIdx === 0 || currentIdx === this.baseList.length - 1)
        return false;
      const next = parseInt(currentIdx, 10) - 1;
      const prev = parseInt(currentIdx, 10) + 1;
      const currentDate = this.getDate(this.baseList[currentIdx].name)
        .split("/")
        .join();
      const nextDate = this.getDate(this.baseList[next].name).split("/").join();
      const prevDate = this.getDate(this.baseList[prev].name).split("/").join();
      return (
        (currentDate !== nextDate || currentDate !== prevDate) &&
        currentIdx % 3 === 0
      );
    },
  },
};
</script>

<style scoped lang="scss">
// the color is as same as var(--cyan-dark)
$mask-cyan: rgba(22, 78, 99, 0.7);
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
  background-color: $mask-cyan;
}
._icon {
  width: 40%;
  height: 15%;
  top: -0.5rem;
  left: 0.5rem;
  background-color: $mask-cyan;
  color: var(--cyan-light);
  border-radius: 2vw;
  font-size: 2vw;
}
</style>
