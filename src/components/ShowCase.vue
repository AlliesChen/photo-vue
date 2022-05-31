<template>
  <main
    @touchmove="moveTouch"
    @touchend="endTouch"
    :style="style"
    class="grid__col--3"
  >
    <File-Case
      v-if="currentIndex > 0"
      :fileType="`${prev.type}/${prev.ext}`"
      :fileName="prev.name"
      :source="prev.origin"
    />
    <File-Case
      :fileType="fileType"
      :fileName="$route.params.id"
      :source="source"
      class="carry"
    />
    <File-Case
      v-if="currentIndex < baseList().length - 1"
      :fileType="`${next.type}/${next.ext}`"
      :fileName="next.name"
      :source="next.origin"
    />
  </main>
</template>

<script>
import { baseURL } from "../store/files";
import FileCase from "./FileCase.vue";
export default {
  components: {
    FileCase,
  },
  props: {
    currentIndex: Number,
    fileType: String,
  },
  data() {
    return {
      baseURL,
      touchStartX: "",
      touchMoveX: "",
    };
  },
  inject: ["baseList"],
  computed: {
    source() {
      return this.baseList()[this.currentIndex].origin;
    },
    prev() {
      return {
        ...this.baseList()[this.currentIndex - 1],
      };
    },
    next() {
      return {
        ...this.baseList()[this.currentIndex + 1],
      };
    },
    style() {
      return {
        transform: `translate(${this.touchMoveX}%)`,
      };
    },
  },
  watch: {
    currentIndex(newIndex) {
      const list = this.baseList();
      if (newIndex === list.length - 1) {
        const currentItem = list[newIndex];
        this.$store.dispatch("getFileNames", [
          this.$route.params.type,
          currentItem.name,
        ]);
      }
    },
  },
  methods: {
    moveTouch(e) {
      if (!this.touchStartX) {
        this.touchStartX = e.targetTouches[0].clientX;
      } else {
        const sreenMoveRatio =
          ((e.targetTouches[0].clientX - this.touchStartX) /
            e.view.outerWidth) *
          100;
        // NOTE: slow down the translate(move) speed
        const moveSpeedAdjust = 0.5;
        this.touchMoveX = sreenMoveRatio * moveSpeedAdjust;
      }
    },
    endTouch() {
      // NOTE: 15 is base on my personal use experience
      if (
        this.touchMoveX < -15 &&
        this.currentIndex < this.baseList().length - 1
      ) {
        this.$router.push(`/${this.next.list}/${this.next.name}`);
      }
      if (this.touchMoveX > 15 && this.currentIndex > 0) {
        this.$router.push(`/${this.prev.list}/${this.prev.name}`);
      }
      this.touchStartX = 0;
      this.touchMoveX = 0;
    },
  },
};
</script>

<style scoped>
.grid__col--3 {
  display: grid;
  grid-template: 100% / repeat(3, 90vw);
  column-gap: 5vw;
  justify-items: center;
  align-items: center;
}
.carry {
  grid-column-start: 2;
}
</style>
