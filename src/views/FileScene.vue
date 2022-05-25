<template>
  <article class="w-full h-full flex-col items-center bg__black">
    <header class="text-white flex items-center">
      {{ `${currentIndex + 1}/${baseList.length}` }}
      <!-- back to images or videos -->
      <router-link
        :to="`/${typeRef}`"
        class="absolute right-4 flex items-center text-white"
      >
        <feather type="x" />
      </router-link>
    </header>
    <main
      @touchmove="moveTouch"
      @touchend="endTouch"
      :style="style"
      class="grid__col--3"
    >
      <File-Case
        v-if="currentIndex > 0"
        :type="type"
        :alter="prev.name"
        :source="`${baseURL}/${type}/${prev.name}`"
        class="prev"
      />
      <File-Case :type="type" :alter="id" :source="source" class="carry" />
      <File-Case
        v-if="currentIndex < baseList.length - 1"
        :type="type"
        :alter="next.name"
        :source="`${baseURL}/${type}/${next.name}`"
        class="next"
      />
    </main>
    <footer class="text-white flex items-center">{{ timestamp }}</footer>
  </article>
</template>

<script>
import { baseURL } from "../store/files";
import CommonInfo from "../components/mixin/CommonInfo.vue";
import FileCase from "../components/FileCase.vue";
export default {
  name: "FileScene",
  mixins: [CommonInfo],
  components: {
    FileCase,
  },
  data() {
    return {
      type: "",
      id: "",
      source: "",
      touchStartX: "",
      touchMoveX: "",
      baseURL,
    };
  },
  computed: {
    currentIndex() {
      return this.baseList.map((item) => item.name).indexOf(this.id);
    },
    typeRef() {
      return this.type.concat("s");
    },
    timestamp() {
      const timeFormat = this.id.match(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
      );
      return `${timeFormat[1]}/${timeFormat[2]}/${timeFormat[3]} ${timeFormat[4]}:${timeFormat[5]}:${timeFormat[6]}`;
    },
    prev() {
      return {
        ...this.$store.getters.checkItem(this.typeRef, this.currentIndex - 1),
      };
    },
    next() {
      return {
        ...this.$store.getters.checkItem(this.typeRef, this.currentIndex + 1),
      };
    },
    style() {
      return {
        transform: `translate(${this.touchMoveX}%)`,
      };
    },
  },
  methods: {
    moveTouch(e) {
      if (!this.touchStartX) {
        this.touchStartX = e.targetTouches[0].clientX;
      } else {
        // NOTE: it's a decimal number
        const sreenMoveRatio =
          (this.touchStartX - e.targetTouches[0].clientX) / e.view.outerWidth;
        // NOTE: make sreenMoveRatio to percentage
        // NOTE: negtive makes the swipe direction intuitively
        // NOTE: slow down the speed in swiping by using a half of 100 instead
        const moveAdjust = -50;
        this.touchMoveX = sreenMoveRatio * moveAdjust;
      }
    },
    endTouch() {
      // 15 is base on my personal use experience
      if (
        this.touchMoveX < -15 &&
        this.currentIndex < this.baseList.length - 1
      ) {
        this.$router.push(`/${this.type}/${this.next.name}`);
      }
      if (this.touchMoveX > 15 && this.currentIndex > 0) {
        this.$router.push(`/${this.type}/${this.prev.name}`);
      }
      this.touchStartX = 0;
      this.touchMoveX = 0;
    },
  },
  watch: {
    $route(newPath, oldPath) {
      if (Object.keys(newPath.params).length) {
        this.type = newPath.params.type;
        this.id = newPath.params.id;
      } else {
        this.type = oldPath.params.type;
        this.id = oldPath.params.id;
      }
      this.source = `${baseURL}/${this.type}/${this.id}`;
    },
  },
  created() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    this.source = `${baseURL}/${this.type}/${this.id}`;
  },
  activated() {
    this.$store.commit("useScene", "showcase");
  },
  deactivated() {
    this.$store.commit("useScene", "none");
  },
};
</script>

<style scoped lang="scss">
header,
footer {
  height: 4rem;
}
main {
  /* header and footer are both 8 rem height */
  min-height: calc(100vh - 8rem);
  & .carry {
    grid-column-start: 2;
  }
}
.bg__black {
  background-color: var(--black);
}
.mask {
  z-index: 2;
}
.grid__col--3 {
  display: grid;
  grid-template: 100% / repeat(3, 90vw);
  column-gap: 5vw;
  justify-items: center;
  align-items: center;
}
</style>
