<template>
  <article class="w-full h-full flex-col items-center bg--black">
    <header class="text-white flex items-center">
      {{ `${baseList().length - currentIndex}/${baseList().length}` }}
      <!-- back to images or videos -->
      <router-link
        :to="`/${routeType}s`"
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
        :fileType="prev.type"
        :fileName="prev.name"
        :source="`${baseURL}/${prev.type.match(/\w+/)[0]}/${prev.name}`"
        class="prev"
      />
      <File-Case
        :fileType="fileType"
        :fileName="routeId"
        :source="source"
        class="carry"
      />
      <File-Case
        v-if="currentIndex < baseList().length - 1"
        :fileType="next.type"
        :fileName="next.name"
        :source="`${baseURL}/${next.type.match(/\w+/)[0]}/${next.name}`"
        class="next"
      />
    </main>
    <footer class="text-white flex items-center">{{ timestamp }}</footer>
  </article>
</template>

<script>
import { baseURL } from "../store/files";
import FileCase from "../components/FileCase.vue";
export default {
  name: "FileScene",
  components: {
    FileCase,
  },
  data() {
    return {
      routeType: "",
      routeId: "",
      source: "",
      touchStartX: "",
      touchMoveX: "",
      baseURL,
    };
  },
  inject: ["baseList"],
  computed: {
    currentIndex() {
      return this.baseList()
        .map((item) => item.name)
        .indexOf(this.routeId);
    },
    fileType() {
      // Match and select the file extension (separate by the dot)
      return `${this.routeType}/${this.routeId.match(/\w+/g)[1]}`;
    },
    timestamp() {
      const timeFormat = this.routeId.match(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
      );
      return `${timeFormat[1]}/${timeFormat[2]}/${timeFormat[3]} ${timeFormat[4]}:${timeFormat[5]}:${timeFormat[6]}`;
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
        this.$router.push(
          `/${this.next.type.match(/\w+/)[0]}/${this.next.name}`
        );
      }
      if (this.touchMoveX > 15 && this.currentIndex > 0) {
        this.$router.push(
          `/${this.prev.type.match(/\w+/)[0]}/${this.prev.name}`
        );
      }
      this.touchStartX = 0;
      this.touchMoveX = 0;
    },
  },
  watch: {
    $route(newPath, oldPath) {
      if (Object.keys(newPath.params).length) {
        this.routeType = newPath.params.type;
        this.routeId = newPath.params.id;
      } else {
        this.routeType = oldPath.params.type;
        this.routeId = oldPath.params.id;
      }
      this.source = `${baseURL}/${this.routeType}/${this.routeId}`;
    },
  },
  created() {
    this.routeType = this.$route.params.type;
    this.routeId = this.$route.params.id;
    this.source = `${baseURL}/${this.routeType}/${this.routeId}`;
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
.bg--black {
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
