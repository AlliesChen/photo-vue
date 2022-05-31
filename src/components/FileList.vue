<template>
  <ol class="m-0 p-0">
    <li v-for="(item, index) in baseList()" :key="item.id" class="relative">
      <router-link :to="`${$route.params.type}/${item.id}`">
        <File-Case
          :fileType="item.type"
          :source="item.type === 'image' ? item.small : item.origin"
          :fileName="item.id"
          :observer="observer"
          :lastItem="lastItem"
        />
      </router-link>
      <div
        v-if="showDate(index)"
        class="_icon absolute flex justify-center items-center"
      >
        {{ getDate(item.id) }}
      </div>
      <div
        v-show="currentMode() === 'selection'"
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
import FileCase from "./FileCase.vue";
export default {
  name: "FileList",
  components: {
    FileCase,
  },
  data() {
    return {
      listStart: 0,
      listStop: 0,
      observer: null,
    };
  },
  inject: ["baseList", "currentMode"],
  computed: {
    lastItem() {
      const list = this.baseList();
      const lastIndex = list.length - 1;
      return { ...list[lastIndex] };
    },
  },
  methods: {
    setFile(index) {
      if (this.currentMode() === "selection") {
        this.$store.commit("setSelected", [this.$route.params.type, index]);
      }
    },
    getDate(fileName) {
      const timestamp = fileName.match(/(\d{4})(\d{2})(\d{2})/);
      return `${timestamp[1]}/${timestamp[2]}/${timestamp[3]}`;
    },
    showDate(currentIdx) {
      // not the first and not the first of the row
      if (currentIdx === 0 || currentIdx % 3 !== 0) return false;
      // the next row's first item index
      const last = parseInt(currentIdx, 10) - 3;
      // not an item undefined in the list
      if (last >= this.baseList().length) return false;
      const currentDate = this.getDate(this.baseList()[currentIdx].id)
        .split("/")
        .join();
      const futureDate = this.getDate(this.baseList()[last].id)
        .split("/")
        .join();
      // is from different dates
      return currentDate !== futureDate;
    },
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        this.observer.unobserve(target);
        const address = this.lastItem.type.match(/\w+/)[0].concat("s");
        this.$store.dispatch("getFileNames", [address, this.lastItem.id]);
      });
    },
  },
  created() {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      root: this.$el,
      threshold: 1,
    });
  },
  beforeDestroy() {
    this.observer.disconnect();
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
